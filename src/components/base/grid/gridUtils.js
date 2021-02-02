import { toast } from 'react-toastify';
import {cloneDeep} from 'lodash';
import { capitalizeFirstLetter } from 'services/utils';
import {
  initGrid,
  getGridData,
  setGridInfo,
  setGridValue,
  updateGridRowInfo,
  updateGridRowSelectInfo,
  updateGridRowData,
  undoGridRowData,
  newRowAdd,
  newRowDelete,
  updateFormRowColumn,
  updateFormError,
  deleteFormError,
  resetFormErrors
} from 'actions/gridActions';
import api from 'services/http';

export default function gridUtils (props, dispatch) {
  var {
    url,
    overrideDefaultProps,
    isStateInitialized,
    stopInitialLoad,
    loading,
    reload,
    canDelete,
    showAction,
    isMultiSelect,
    page_size,
    count,
    page,
    mode,
    sortkey,
    sorttype,
    title,
    gridkey,
    page_sizes,
    headers,
    columns,
    results,
    add_rows,
    form,
    viewFields,
    editFields,
    noSortFields,
    canOnlyViewFields,
    rows_info,
    reloadOn,
    lookup,
    lookup_row,
    lookup_parent_row,
    validators,
    defaultValues,
    dynamic_filter,
    default_filter,
    rowClick,
    ...other_props
  } = props;
  
  const getHeaderFromColumn = (column) => headers[columns.indexOf(column)];
  const _getTitle = () => {
    let _title = title;
    if(_title.endsWith('s')) {
      _title = _title.substring(0, _title.length - 1);
    }
    return _title;
  }
  const getParams = () => {
    let params = { page };
    const excepted_keys = ['no_page'];
    if (sortkey) {
      params.ordering = sorttype == 'asc' ? sortkey : '-' + sortkey;
    }
    if (page_size) {
      params.page_size = page_size;
    }
    for (let [key, value] of Object.entries(dynamic_filter)) {
      if (excepted_keys.indexOf(key) >= 0) {
        params[key] = value;
      } else {
        params[key + '__istartswith'] = value;
      }
    }
    for (let [key, value] of Object.entries(default_filter)) {
      if (key == 'no_page') {
        delete params['page']
      }
      params[key] = value;
    }
    return {...params}
  }
  const load_table = () => {
    let params = getParams();
    dispatch(getGridData(gridkey, { url, params }))
  }
  const pageInfo = () => {
    let from = 0, to = 0;
    if (count) {
      from = page_size * (page - 1) + 1;
      to = (page * page_size) >= count ? count : (page * page_size);
    }
    return `${from} - ${to} of ${count}`;
  }
  const onSetGridInfo = (info_obj) => {
    let all_info_obj = {
      url,
      overrideDefaultProps,
      isStateInitialized,
      stopInitialLoad,
      loading,
      reload,
      canDelete,
      showAction,
      isMultiSelect,
      page_size,
      count,
      page,
      mode,
      sortkey,
      sorttype,
      title,
      gridkey,
      page_sizes,
      headers,
      columns,
      add_rows,
      form,
      viewFields,
      editFields,
      noSortFields,
      canOnlyViewFields,
      rows_info,
      reloadOn,
      lookup,
      lookup_row,
      lookup_parent_row,
      validators,
      defaultValues,
      dynamic_filter,
      default_filter,
      rowClick,
    }
    let _info_obj = !!info_obj ? info_obj : all_info_obj;
    dispatch(setGridInfo(gridkey, _info_obj))
  }
  const onSetGridRowInfo = (id, info_obj) => {
    dispatch(updateGridRowInfo(gridkey, id, info_obj));
  }
  const paginateTable = (page) => {
    if (page > 0 && (page_size * (page - 1)) < count) {
      onSetGridInfo({ page })
    }
  }
  const getGridRowData = (id) => {
    let params = getParams();
    dispatch(updateGridRowData(gridkey, { url:(url + String(id) + '/'), params }))
  }
  const sortTable = (hid) => {
    let _sorttype, _sortkey = columns[hid];
    if (sortkey === _sortkey) {
      _sorttype = sorttype === 'asc' ? 'des' : 'asc';
    } else {
      _sorttype = 'asc';
    }
    onSetGridInfo({ sortkey: _sortkey, sorttype: _sorttype, page: 1 })
  }
  //When changing page size
  const updatePageSize = (page_display) => {
    let _page_size = isNaN(Number(page_display)) ? count : page_display;
    onSetGridInfo({page_size:_page_size})
  }
  //when clicked on row save button after editing
  const onRowSave = (ix, result) => {
    if(onValidateFields(ix)) {
      api.patch(`${url}${result.id}/`, result).then(response => {
        if(reloadOn.includes('update')) {
          reloadTable()
        }
        toast.success(`${_getTitle()} updated successfully`)
      }).catch(err => {
        toast.error('Error in updating')
      }).finally(()=>{
        getGridRowData(result.id)
        onSetGridRowInfo(result.id, {mode: 'view'})
      })
    } else {
      toast.error('Resolve the error(s) to update')
    }
  }
  const onRowDelete = (index, id) => {
    api.delete(`${url}${id}/`).then(response => {
      toast.success(`Deleted ${_getTitle().toLowerCase()} details successfully`)
      reloadTable()
    }).catch(err => {
      if(!!err.message && Array.isArray(err.message)) {
        toast.error(capitalizeFirstLetter(err.message[0]))
      } else {
        toast.error(capitalizeFirstLetter(err))
      }
    })
  }
  const reloadTable = () => {
    let initTableInfo = { reload: true, page: 1, count: 0 };
    onSetGridInfo(initTableInfo);
  }
  //When clicked on row cancel button to revert back changes
  const onRowCancel = (index, id) => {
    dispatch(undoGridRowData(gridkey, index, id))
  }
  const onNewRowAdd = () => {
    dispatch(newRowAdd(gridkey, defaultValues))
  }
  const onNewRowDelete = (ix) => {
    dispatch(newRowDelete(gridkey, ix))
  }
  const onNewRowSave = (ix) => {
    let result = add_rows[ix];
    if(onValidateFields(`add_${ix}`)) {
      api.post(`${url}`, result).then(response => {
        toast.success('Added successfully');
        onNewRowDelete(ix);
        reloadTable();
      }).catch(err => {
        if(!!err.message && Array.isArray(err.message)) {
          toast.error(capitalizeFirstLetter(err.message[0]))
        } else {
          toast.error(err)
        }
      })
    } else {
      let _title = title.toLowerCase();
      if (_title.endsWith('s')) {
        _title = _title.split("");
        _title.pop();
        _title = _title.join("")
      }
      toast.error(`Resolve errors to add ${_title}`)
    }
  }
  const onGridValueChange = (row_ix, column, e, source) => {
    let value = e.target.value;
    
    if(e.target.type === 'checkbox') {
      value =  e.target.checked
    }
    validateColumn((source === 'add_rows' ? `add_${row_ix}` : row_ix), column, value, 'change')
    dispatch(setGridValue(gridkey, row_ix, column, value, source));
  }
  const onLookupFieldClick = (row_ix, column, source) => {
    onSetGridInfo({lookup_row: {row: row_ix, column, source}});
  }
  const onRowClick = (result, is_result) => {
    if(!!lookup) {
      Object.entries(lookup.select_fields).forEach(([column, parent_column])=> {
        //validateColumn((lookup_parent_row.source === 'add_rows' ? `add_${lookup_parent_row.row}` : lookup_parent_row.row), parent_column, result[column], 'change', lookup.parent_key)
        dispatch(setGridValue(lookup.parent_key, lookup_parent_row.row, parent_column, result[column], lookup_parent_row.source));
      })
      dispatch(setGridInfo(lookup.parent_key, {lookup_row: undefined}))
      // onSetGridInfo({lookup_row: undefined})
    } else if(is_result){
      dispatch(updateGridRowSelectInfo(gridkey, result.id, {selected: true}, isMultiSelect))
      if(props.rowClick) {
        props.rowClick(result);
      }
    }
  }
  const onToggleDelete = (mode) => {
    let id, index;
    for (const [key, value] of Object.entries(rows_info)) {
      if(value.can_delete) {
        id = key;
        index = value.index;
      }
    }
    if (!!id && mode == 'cancel') {
      onSetGridRowInfo(id, {can_delete: false})
    } else if (!!id && mode == 'delete') {
      onRowDelete(index, id)
      onSetGridRowInfo(id, {can_delete: false})
    }
  }
  const onUpdateFormRowColumn = (id, column, obj) => {
    dispatch(updateFormRowColumn(gridkey, id, column, obj));
  }

  const onUpdateFormError = (id, column, obj, _gridkey) => {
    if(!!_gridkey) {
      dispatch(updateFormError(_gridkey, id, column, obj));
      return;
    }
    dispatch(updateFormError(gridkey, id, column, obj));
  }

  const onDeleteFormError = (id, column, error_key) => {
    dispatch(deleteFormError(gridkey, id, column, error_key));
  }

  const onResetFormErrors = (id) => {
    dispatch(resetFormErrors(gridkey, id));
  }

  const validateColumn = (ix, column, value, _mode) => {
    let type = (typeof ix === 'string' && ix.startsWith("add_")) ? 'create' : 'update';
    let result = (type === 'create') ? add_rows[+ ix.replace('add_', '')] :  results[ix];
    let header = getHeaderFromColumn(column);
    let errors = {};
    let _validators = validators[column] || [];
    if(value !== undefined) {
      result = cloneDeep(result)
      result[column] = value;
    }
    if(!!_mode) {
      _validators = _validators.filter(_validator => { 
        return _validator.mode.includes(_mode)
      })
    }
    _validators.forEach(validator => {
      let error_key, response, {sync, async, mode} = validator;
      if(!!sync) {
        error_key = sync.name;
        response = sync(result, column);
      }
      if(Array.isArray(response) && response[0] === false) {
        errors[error_key] = response[1];
      } else if(response === false) {
        errors[error_key] = `invalid ${header}`;
      } else {
        errors[error_key] = null;
      }
    })
    onUpdateFormError((type === 'create' ? ix : result.id) , column, {...errors})
    return Object.values(errors).every(value => !value)
  }
  const onValidateFields = (ix) => {
    let valid_columns = []
    columns.forEach(column => {
      if (!!validators[column]) {
        valid_columns.push(validateColumn(ix, column))
      }
    })
    return valid_columns.every(valid => valid)
  }

  return {
    load_table,
    getParams,
    pageInfo,
    onSetGridInfo,
    paginateTable,
    sortTable,
    updatePageSize,
    reloadTable,
    getGridRowData,
    validateColumn,
    onRowCancel,
    onRowSave,
    onRowDelete,
    onGridValueChange,
    onSetGridRowInfo,
    onNewRowAdd,
    onNewRowDelete,
    onNewRowSave,
    onRowClick,
    onLookupFieldClick,
    onToggleDelete,
    onUpdateFormRowColumn,
    onValidateFields,
    onUpdateFormError,
    onDeleteFormError,
    onResetFormErrors,
    ...props
  }
}
import React, { useEffect, useState} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import Portal from 'base/portal/Portal';
import {useLocation, NavLink, useParams} from 'react-router-dom';

import history from 'services/history';
import {
  initGrid,
  getGridData,
  setGridInfo,
  updateGridRowInfo,
  undoGridRowData
} from 'actions/gridActions';
import  {
  renderActionElement,
  Input,
  Switch,
  Select,
  Date,
  Lookup
} from './gridElement/GridElement';
import gridUtils from './gridUtils';

import './bgrid.scss';
import { DropdownButton, Dropdown } from 'react-bootstrap';

export const GridTable = function (props) {
  const dispatch = useDispatch(),
  [isInitialized, setIsInitialized] = useState(false);
  var propUtils;
  props = useSelector(state => {
    let griddata = state.griddata[props.gridkey],
    _props = !!griddata 
      ? { ...props, ...griddata.info, ...griddata.data, rows_info: {...griddata.rows_info}, add_rows: [...griddata.add_rows], form: {...griddata.form}, original_data: {...griddata.original_data}, default_filter: props.default_filter, editFields: props.editFields, defaultValues: props.defaultValues }
      : { ...props };
    if(!!griddata && !!griddata.info && griddata.info.overrideDefaultProps) {
      let {info} = griddata;
      _props = {..._props, default_filter: info.default_filter, editFields: info.editFields, defaultValues: info.defaultValues }
    }
    if(!!props.lookup && !!state.griddata[props.lookup.parent_key].info.lookup_row) {
      _props = {..._props,lookup_parent_row: {...state.griddata[props.lookup.parent_key].info.lookup_row}}
    }

    propUtils = gridUtils(_props, dispatch)
    return _props;
  });
  let {
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
    viewFields,
    editFields,
    noSortFields,
    validators,
    defaultValues,
    results,
    rows_info,
    add_rows,
    form,
    original_data,
    reloadOn,
    lookup,
    lookup_row,
    lookup_parent_row,
    dynamic_filter,
    default_filter,
    canOnlyViewFields,
    rowClick,
    getHeaderDataElement,
    getBodyRowElement,
    getBodyDataElement,
    getDeletePromptMsg,
    ...other_props
  } = props;
  
  const init_grid = (unmount) => {
    dispatch(initGrid(gridkey));
    if(!unmount) {
      propUtils.onSetGridInfo();
    }
  }
  
  //to remove store data on url change
  useEffect(() => {
    init_grid(true);
  }, [location]);

  //load table only when reload is true (triggered from external component)
  useEffect(() => {
    if (!!reload) {
      propUtils.load_table();
    }
  }, [reload]);
  
  //initialization hook
  useEffect(() => {
    if (isInitialized == false) {
      init_grid();
      if (stopInitialLoad === false) {
        propUtils.load_table();
      }
      propUtils.onSetGridInfo({isStateInitialized: true});
      //stop multiple grid init
      setIsInitialized(true)
    }
    return () => {
      init_grid(true);
    }
  }, []);

  //load table when following variables change
  //mode, page_size, sortkey, sorttype, page, dynamic_filter, default_filter
  useEffect(() => {
    if(isStateInitialized) {
      propUtils.load_table();
    } 
  }, [mode, page_size, sortkey, sorttype, page]);

  useDeepCompareEffect(() => {
    if(isStateInitialized) {
      propUtils.load_table();
    } 
  }, [dynamic_filter, default_filter]);

  const renderToolbar = () => {
    return (
      <div className="grid-toolbar">
        <div className="grid-title">{title}</div>
        <div className="grid-pagination">
          <div
            className="page-action page-left"
            onClick={() => propUtils.paginateTable(page - 1)}
          >
            <i className="far fa-chevron-left"></i>
          </div>
          <div className="page-from-to">
            <DropdownButton id="pagination-dropdown" title={propUtils.pageInfo()}>
              <Dropdown.Header>Rows:</Dropdown.Header>
              {page_sizes.map(size =>
                <Dropdown.Item
                  key={size}
                  onClick={() => propUtils.updatePageSize(size)}
                >
                  <span className="page-size">{size}</span>
                </Dropdown.Item>
              )}
            </DropdownButton>
          </div>
          <div
            className="page-action page-right"
            onClick={() => propUtils.paginateTable(page + 1)}
          >
            <i className="far fa-chevron-right"></i>
          </div>
        </div>
        <div className="divider"></div>
        <div
          className="grid-action add-new-row"
          onClick={() => propUtils.onNewRowAdd()}
        >
          <i className="fal fa-plus-circle" />
        </div>
        <div
          className="grid-action reload-data"
          onClick={() => propUtils.reloadTable()}
        >
          <i className="fal fa-sync" />
        </div>
        <div className="grid-action download">
          <i className="fal fa-arrow-circle-down" />
        </div>
        <div className="grid-action column-selection">
          <i className="fal fa-line-columns" />
        </div>
        {/* <i className="grid-action fal fa-arrow-circle-down"></i>
        <i className="grid-action fal fa-line-columns"></i> */}
      </div>
    )
  }
  const renderSortIcon = (header_name, hid, activeHeader) => {
    //Stop loading sort icon if the column name is present inside noSortFields array
    if(noSortFields.length > 0 && noSortFields.includes(columns[hid])) {
      return;
    }
    if(!!viewFields[hid] && viewFields[hid].e === 'a' ) {
      return;
    }
    const sort_class = (header_name === activeHeader && sorttype === 'des')
      ? 'fa-long-arrow-down'
      : 'fa-long-arrow-up';

    return (
      <i className={`far ${sort_class}`}></i>
    )
  }
  const renderHeader = () => {
    let activeHeader = headers[columns.findIndex(col => col === sortkey)];
    return (
      <div className="thead grid-header">
        <div
          className="tr"
        >
          {
            showAction &&
            <div
            className="th action-column column"
            >
              Action
            </div>
          }   
          {headers.map((header, hid) =>
            <div
              className={`th column  ${activeHeader === header ? 'active' : ''} ${columns[hid]}`}
              key={header}
              onClick={() => {
                if(!!viewFields[hid] && viewFields[hid].e === 'a' ) {
                  return;
                }
                //Stop sorting functionality if the column name is present inside noSortFields array
                if(noSortFields.length > 0 && noSortFields.includes(columns[hid])) {
                  return;
                }
                propUtils.sortTable(hid)
              }}
            >
              {header}
              <div className="sort-icon" key={header + sorttype}>
                {renderSortIcon(header, hid, activeHeader)}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
  const renderCell = (result, resid, column, cid) => {
    let _row_info = rows_info[result.id];
    if(!_row_info) {
      _row_info = {mode: 'add'}
    }
    if((_row_info.mode === 'view' || canOnlyViewFields.includes(column)) && _row_info.mode !== 'add') {
      if (viewFields[cid] === 'badge') {
        return <div className={`cell badge badge-${result[column]} ${result[column]}`}></div>
      } 
      if (viewFields[cid] === 'password') {
        return (
          <div className={`cell password ${result[column]}`}>******</div>
        )
      } else if (typeof viewFields[cid] === 'function') {
        return (
          <div className="cell">
            {viewFields[cid](result, resid, column, cid, _row_info)}
          </div>
        )
      } else if (viewFields[cid] === 'date_only') {
        return (
          <div className="cell">
            {result[column].split(' ')[0]}
          </div>
        )
      } else if (typeof viewFields[cid] === 'object' && viewFields[cid].e === 'a') {
        let href = `/${viewFields[cid].uri}/${viewFields[cid].keys.map(key=>result[key]).join('/')}/`;
        return (
          <NavLink to={href}>
            {viewFields[cid].label}
          </NavLink>
          // <a href={href}>{viewFields[cid].label}</a>
        )
      }
    } else if ((_row_info.mode === 'edit' && !!editFields[cid]) || (_row_info.mode === 'add' && !canOnlyViewFields.includes(column))) {
      let attrs = {
        row_ix:resid, 
        column,
        column_ix: cid, 
        result,
        source : _row_info.mode === 'edit' ? 'results': 'add_rows'
      }; 
      if(!!editFields[cid]) {
        if(!!editFields[cid].attrs)
          attrs = {...attrs, ...editFields[cid].attrs}
      }
      if(!editFields[cid] || editFields[cid].e === 'input') {
        return (
          <Input
          propUtils = {propUtils}
          attrs = {attrs}
          />
        )
      } else if(editFields[cid].e === 'switch') {
        return (
          <Switch
          propUtils = {propUtils}
          attrs = {attrs}
          />
        )
      } else if(editFields[cid].e === 'select') {
        return (
          <Select
          propUtils = {propUtils}
          attrs = {attrs}
          options = {editFields[cid].options}
          />
        )
      } else if(editFields[cid].e === 'date') {
        return (
          <Date 
          propUtils = {propUtils}
          attrs = {attrs}
          />
        )
      } else if(editFields[cid].e === 'lookup') {
        return (
          <Lookup
          propUtils = {propUtils}
          attrs = {attrs}
          config={editFields[cid].config}
          onClick={()=>propUtils.onLookupFieldClick(resid, column, _row_info.mode == 'add' ? 'add_rows' : 'results')}
          />
        )
      }
    }
    return (
      <div className="cell">{result[column]}</div>
    )
  }
  const renderBodyRow = () => {
    const getRowClass = (result) => {
      let row_class = '';
      if(!!result) {
        Object.entries(result).forEach(([key, value]) => {
          if(!!value && typeof value  === "string")
            value = value.replace(/ /g, "-");
          row_class = row_class + ` ${key}-${value}`;
        });
      }
      return row_class
    }
    if (getBodyRowElement) {
      return getBodyRowElement(props)
    }
    else {
      return (
        <React.Fragment> 
        {
          [add_rows, results].map((data, is_result)=>
            data.map((result, resid) =>
              <div className={`tr ${is_result == 0 ? 'tr-added' : 'tr-result'} tr-${result.id} ${getRowClass(result)} ${rows_info[result.id] && rows_info[result.id].selected ? 'tr-selected' : ''}`} key={resid} onClick={()=>propUtils.onRowClick(result, is_result)}>
                {showAction &&
                  <div className="td column action-column">
                    {renderActionElement(propUtils, result, resid)}
                  </div>
                }
                {columns.map((column, cid) =>
                  <div className={`td column ${column}`} key={cid} >
                    {renderCell(result, resid, column, cid)}
                  </div>
                )}
              </div>
            )
          )
        }
        </React.Fragment>
      )
    }
  }
  const renderBody = () => {
    return (
      <div className="tbody grid-body">
        {renderBodyRow()}
      </div>
    )
  }
  const renderNoRecords = () => {
    if (!loading && results.length == 0 && add_rows.length == 0) {
      return (
        <div className="no-records-column">
          <i className="fal fa-file-search"></i>
          <span>No Data Found</span>
        </div>
      )
    }
  }
  const renderLoading = () => {
    return (
      <div className={`grid-loader ${loading == true ? 'active' : ''}`}>
        <i className="fal fa-sync"></i>
      </div>
    )
  }
  const renderDeleteConfirm = () => {
    let show_confirm = false;
    let confirm_msg = "Are you sure you want to delete?";
    if(!!rows_info) {
        for (const [id, obj] of Object.entries(rows_info)) {
          if(obj.can_delete) {
            if(!!getDeletePromptMsg) {
              confirm_msg = getDeletePromptMsg(original_data[id], confirm_msg)
            }
            show_confirm = true;
            break;
          }
        }
    }
    
    
    if(show_confirm) {
      return (
        <Portal id="modal">
            <div className={`modal grid-modal delete-modal active`}>
              <div className="modal-body">
                {confirm_msg}
                <div className="actions-row">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => propUtils.onToggleDelete('cancel')}>Cancel</button>
                  <button type="button" className="btn btn-danger btn-sm ml-2" onClick={() => propUtils.onToggleDelete('delete')}>Delete</button>
                </div>
              </div>
            </div>
        </Portal> 
      )
    }
  }
  return (
    <div className="grid-container" id={gridkey}>
      {renderToolbar()}
      <div className="grid-table-holder">
        <div
          className="table"
        >
          {renderHeader()}
        </div>
        <div
          className="grid-body-container"
        >
          <div className="table">
            {renderBody()}
          </div>
        </div>
      </div>
      {renderNoRecords()}
      {renderLoading()}
      {renderDeleteConfirm()}
    </div>
  )
}
GridTable.propTypes = {
  overrideDefaultProps: PropTypes.bool,
  isStateInitialized: PropTypes.bool,
  stopInitialLoad: PropTypes.bool,
  loading: PropTypes.bool,
  page_size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  canDelete: PropTypes.bool,
  reload: PropTypes.bool,
  showAction: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
  count: PropTypes.number,
  page: PropTypes.number,
  mode: PropTypes.string,
  url: PropTypes.string,
  gridkey: PropTypes.string,
  title: PropTypes.string,
  sortkey: PropTypes.string,
  sorttype: PropTypes.string,
  headers: PropTypes.array,
  columns: PropTypes.array,
  viewFields: PropTypes.array,
  editFields: PropTypes.array,
  noSortFields: PropTypes.array,
  canOnlyViewFields: PropTypes.array,
  results: PropTypes.array,
  add_rows: PropTypes.array,
  reloadOn: PropTypes.array,
  lookup: PropTypes.object,
  lookup_parent_row: PropTypes.object,
  validators: PropTypes.object,
  defaultValues: PropTypes.object,
  default_filter: PropTypes.object,
  dynamic_filter: PropTypes.object,
  rowClick: PropTypes.func,
  getBodyRowElement: PropTypes.func,
  getBodyDataElement: PropTypes.func,
  getHeaderDataElement: PropTypes.func,
  getGridActionElements: PropTypes.func,
  getDeletePromptMsg: PropTypes.func,
};
GridTable.defaultProps = {
  overrideDefaultProps: false,
  isStateInitialized: false,
  stopInitialLoad: false,
  loading: false,
  canDelete: false,
  reload: false,
  showAction: true,
  isMultiSelect: false,
  page_size: 5,
  count: 0,
  page: 1,
  mode: 'view',
  url: '',
  sortkey: '',
  sorttype: '',
  title: '',
  gridkey: '',
  page_sizes: ['All', 5, 10, 25, 50, 100],
  headers: [],
  columns: [],
  viewFields: [],
  editFields:[],
  noSortFields: [],
  canOnlyViewFields: [],
  results: [],
  add_rows: [],
  reloadOn: [],
  lookup: undefined,
  lookup_row: undefined,
  lookup_parent_row: undefined,
  validators: {},
  defaultValues: {},
  default_filter: {},
  dynamic_filter: {}
};

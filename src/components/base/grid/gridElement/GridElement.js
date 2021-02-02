import React, { useState } from 'react';
import cx from 'classnames';
import { Modal, Button, Form, FormGroup, FormControl} from 'react-bootstrap';
import { GridTable } from 'base/grid/Bgrid';
import Portal from 'base/portal/Portal';

import './gridElement.scss';

//render action component for each row
export const renderActionElement = (propUtils, result, resid) => {
  let mode, {canDelete, rows_info} = propUtils;
  if(!!rows_info[result.id]) {
    mode = rows_info[result.id].mode;
  }
  if(mode === 'view') {
    return (
      <React.Fragment>
        <div 
        className="action-button edit-action"
        onClick={()=>propUtils.onSetGridRowInfo(result.id, {mode: 'edit'})}
        key={`${resid}-edit`}
        >
          <div className="action-text">
            <i className="fas fa-pen" />
          </div> 
        </div>
        {canDelete &&
          <div 
          className="action-button delete-action"
          onClick={()=>propUtils.onSetGridRowInfo(result.id, {can_delete: true})}
          key={`${resid}-delete`}
          >
            <div className="action-text">
              <i className="fas fa-trash-alt" />
            </div> 
          </div>
        }
        
      </React.Fragment>
    )
  } else if (mode == 'edit') {
    return (
      <React.Fragment>
        <div 
        className="action-button save-action"
        onClick={()=>propUtils.onRowSave(resid, result)}
        key={`${resid}-save`}
        >
          <div className="action-text">
            <i className="fas fa-check" />
          </div> 
        </div>
        <div 
        className="action-button cancel-action"
        onClick = {() => propUtils.onRowCancel(resid, result.id)}
        key={`${resid}-cancel`}
        >
          <div className="action-text">
            <i className="fas fa-times" />
          </div> 
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <div 
        className="action-button save-action"
        onClick={()=>propUtils.onNewRowSave(resid)}
        key={`${resid}-save`}
        >
          <div className="action-text">
            <i className="fas fa-check" />
          </div> 
        </div>
        <div 
        className="action-button cancel-action"
        onClick = {() => propUtils.onNewRowDelete(resid)}
        key={`${resid}-cancel`}
        >
          <div className="action-text">
            <i className="fas fa-trash-alt" />
          </div> 
        </div>
      </React.Fragment>
    )
  }
}

export const FormHelperText = ({errors}) => {
  return (
    <div 
    role="tooltip" 
    x-placement="right" 
    className="fade show popover bs-popover-right">
      <div className="arrow">
      </div>
      {/* <h3 class="popover-header">Popover right</h3> */}
      <div className="popover-body">
        {Object.values(errors).map(error => 
          <div key={error}>{error}</div>
        )}
      </div>
    </div>
  )
}

export const Input = (props) => {
  let {propUtils, attrs:{result, column, row_ix, source, ...attrs}} = props;
  let form_id = source === "add_rows" ? `add_${row_ix}` : result.id;
  let {changed, clicked, dirty, errors, focused, touched} = propUtils.form[form_id][column];
  let classnames = cx("form-control grid-input", {
    'is_blured': !focused,
    'is_focused': focused,
    'is_touched': touched,
    'is_untouched': !touched,
    'is_pristine': !dirty,
    'is_dirty': dirty,
    'is_valid': (Object.keys(errors).length == 0),
    'is_invalid': (Object.keys(errors).length > 0),
    'is_changed': changed,
    'is_unchanged': !changed,
    'is_clicked': clicked,
  })
  return (
    <>
    <input
    onChange={(e)=>propUtils.onGridValueChange(row_ix, column, e, source)}
    onFocus={e => propUtils.onUpdateFormRowColumn(form_id, column, {focused: true})}
    onBlur={e => propUtils.onUpdateFormRowColumn(form_id, column, {focused: false, touched: true})}
    className={classnames}
    value={result[column]}
    autoComplete={`new-${column}`}
    {...attrs}
    />
    {Object.values(errors).length > 0 &&
      <FormHelperText errors={errors}></FormHelperText>
    }
    </>
  )
}
export const Switch = (props) => {
  let {propUtils, attrs:{result, column, row_ix, source, ...attrs}} = props;
  let form_id = source === "add_rows" ? `add_${row_ix}` : result.id;
  let {changed, clicked, dirty, errors, focused, touched} = propUtils.form[form_id][column];
  let classnames = cx({
    'is_blured': !focused,
    'is_focused': focused,
    'is_touched': touched,
    'is_untouched': !touched,
    'is_pristine': !dirty,
    'is_dirty': dirty,
    'is_valid': (Object.keys(errors).length == 0),
    'is_invalid': (Object.keys(errors).length > 0),
    'is_changed': changed,
    'is_unchanged': !changed,
    'is_clicked': clicked,
  })
  return (
    <>
    <Form.Check 
      type="switch"
      onChange={(e)=>propUtils.onGridValueChange(row_ix, column, e, source)}
      checked={result[column]}
      onFocus={e => propUtils.onUpdateFormRowColumn(form_id, column, {focused: true})}
      onBlur={e => propUtils.onUpdateFormRowColumn(form_id, column, {focused: false, touched: true})}
      className={classnames}
      id={`${result.id}${column}`}
      label=''
      {...attrs}
    />
    {Object.values(errors).length > 0 &&
      <FormHelperText errors={errors}></FormHelperText>
    }
    </>
  )
}
export const Select = (props) => {
  let {propUtils, options, attrs:{result, column, row_ix, source, ...attrs}} = props;
  let form_id = source === "add_rows" ? `add_${row_ix}` : result.id;
  let {changed, clicked, dirty, errors, focused, touched} = propUtils.form[form_id][column];
  let classnames = cx("grid-select custom-select-sm", {
    'is_blured': !focused,
    'is_focused': focused,
    'is_touched': touched,
    'is_untouched': !touched,
    'is_pristine': !dirty,
    'is_dirty': dirty,
    'is_valid': (Object.keys(errors).length == 0),
    'is_invalid': (Object.keys(errors).length > 0),
    'is_changed': changed,
    'is_unchanged': !changed,
    'is_clicked': clicked,
  })
  return (
    <>
    <select 
    onChange={(e)=>propUtils.onGridValueChange(row_ix, column, e, source)}
    onFocus={e => propUtils.onUpdateFormRowColumn(form_id, column, {focused: true})}
    onBlur={e => propUtils.onUpdateFormRowColumn(form_id, column, {focused: false, touched: true})}
    className={classnames}
    defaultValue={result[column] || ''}
    value={result[column] || ''}
    >
      <option value=''></option>
      {
      Object.entries(options).map(
        ([key, value])=> <option key={key} value={key}>{value}</option>
      )
      }
    </select>
     {Object.values(errors).length > 0 &&
      <FormHelperText errors={errors}></FormHelperText>
    }
    </>
  )
}
export const Date = (props) => {
  let {propUtils, attrs:{result, column, row_ix, source, min, placeholder, ...attrs}} = props;
  let form_id = source === "add_rows" ? `add_${row_ix}` : result.id;
  let {changed, clicked, dirty, errors, focused, touched} = propUtils.form[form_id][column];
  let classnames = cx("grid-date", {
    'is_blured': !focused,
    'is_focused': focused,
    'is_touched': touched,
    'is_untouched': !touched,
    'is_pristine': !dirty,
    'is_dirty': dirty,
    'is_valid': (Object.keys(errors).length == 0),
    'is_invalid': (Object.keys(errors).length > 0),
    'is_changed': changed,
    'is_unchanged': !changed,
    'is_clicked': clicked,
  })
  return (
    // <div>date</div>
      // <FormGroup controlId="date" bsSize="small">
      
      // </FormGroup>
    <>
    <FormControl
    type="date"
    placeholder={placeholder}
    value={result[column]}
    min={min}
    onChange={(e)=>{ 
      let date = e.target.value;
      if(date.split('-').length > 0 && date.split('-')[0].length > 4) {
        return;
      }
      propUtils.onGridValueChange(row_ix, column, e, source)
    }}
    onFocus={e => propUtils.onUpdateFormRowColumn(form_id, column, {focused: true})}
    onBlur={e => propUtils.onUpdateFormRowColumn(form_id, column, {focused: false, touched: true})}
    className={classnames}
    />
    {Object.values(errors).length > 0 &&
      <FormHelperText errors={errors}></FormHelperText>
    }
    </>
  )
}
export const Lookup = (props) => {
  let {propUtils, onClick, config, attrs:{result, column, column_ix, row_ix, source, ...attrs}} = props,
  {lookup_row, editFields} = propUtils;
  let showlookupGrid = (!!lookup_row && lookup_row.row == row_ix && lookup_row.column == column)
    ? true
    : false;
  let form_id = source === "add_rows" ? `add_${row_ix}` : result.id;
  let {changed, clicked, dirty, errors, focused, touched} = propUtils.form[form_id][column];
  let classnames = cx("form-control grid-input", {
    'is_blured': !focused,
    'is_focused': focused,
    'is_touched': touched,
    'is_untouched': !touched,
    'is_pristine': !dirty,
    'is_dirty': dirty,
    'is_valid': (Object.keys(errors).length == 0),
    'is_invalid': (Object.keys(errors).length > 0),
    'is_changed': changed,
    'is_unchanged': !changed,
    'is_clicked': clicked,
  })
  return (
    <>
    <div className="grid-lookup">
      <input
      onChange={(e)=>propUtils.onGridValueChange(row_ix, column, e, source)}
      onFocus={e => propUtils.onUpdateFormRowColumn(form_id, column, {focused: true})}
      onBlur={e => propUtils.onUpdateFormRowColumn(form_id, column, {focused: false, touched: true})}
      className={classnames}
      value={result[column]}
      autoComplete={`new-${column}`}
      {...attrs}
      />
      <span onClick= {onClick}>
        <i className="far fa-search" />
      </span>
      {showlookupGrid &&
      <Portal id="modal">
        <div className={`modal grid-modal active ${editFields[column_ix].config.gridkey}`}>
          <div className="modal-body">
            <div className="close-modal" onClick={()=>propUtils.onSetGridInfo({lookup_row: undefined})}>
              <i className="far fa-times" />
            </div>
            <GridTable {...config} />
          </div>
        </div>
      </Portal> 
      }
    </div>
    {Object.values(errors).length > 0 &&
      <FormHelperText errors={errors}></FormHelperText>
    }
    </>
  )
}




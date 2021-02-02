import gridService from 'services/gridService';
import { createServiceAction, dispatchAction } from 'actions/serviceActionUtil';

export const getGridData = (key, params) => {
  return createServiceAction('GRID_' + key, gridService.getGridData, params);
};
export const updateGridRowData = (key, params) => {
  return createServiceAction('GRID_' + key + '_UPDATE_ROW_DATA', gridService.getGridData, params);
};
export const initGrid = (key) => {
  return dispatchAction('GRID_' + key + '_INIT', {});
};
export const setGridInfo = (key, info) => {
  return dispatchAction('GRID_' + key + '_SET_INFO', info);
};
export const setGridValue = (key, row, column, value, source) => {
  return dispatchAction('GRID_' + key + '_VALUE', { row, column, value, source });
}
export const updateGridRowInfo = (key, id, data) => {
  return dispatchAction('GRID_' + key + '_UPDATE_ROW_INFO', { id, data });
}
export const updateGridRowSelectInfo = (key, id, data, isMultiSelect) => {
  return dispatchAction('GRID_' + key + '_UPDATE_ROW_SELECT_INFO', { id, data, isMultiSelect });
};
export const undoGridRowData = (key, index, id) => {
  return dispatchAction('GRID_' + key + '_UNDO_ROW_DATA', { index, id });
};
export const gridPreset = (key) => {
  let initTableInfo = { reload: true, page: 1, count: 0 };
  return dispatchAction('GRID_' + key + '_SET_INFO', initTableInfo);
};
export const updateGridDefaultFilters = (key, default_filters) => {
  gridPreset(key)
  return dispatchAction('GRID_' + key + '_UPDATE_GRID_DEFAULT_FILTERS', default_filters);
};
export const newRowAdd = (key, defaultValues) => {
  return dispatchAction('GRID_' + key + '_NEW_ADD_ROW', {defaultValues});
};
export const newRowDelete = (key, id) => {
  return dispatchAction('GRID_' + key + '_NEW_DELETE_ROW', {id});
};
export const updateFormRowColumn = (key, id, column, obj) => {
  return dispatchAction('GRID_' + key + '_UPDATE_FORM_ROW_COLUMN', {id, column, obj});
};

export const updateFormError = (key, id, column, obj) => {
  return dispatchAction('GRID_' + key + '_UPDATE_FORM_ERROR', {id, column, obj});
};
export const deleteFormError = (key, id, column, error_key) => {
  return dispatchAction('GRID_' + key + '_DELETE_FORM_ERROR', {id, column, error_key});
};
export const resetFormErrors = (key, id) => {
  return dispatchAction('GRID_' + key + '_RESET_FORM_ERRORS', {id});
};
// todo: in future while deletion only that row is deleted in the background
// and the row is deleted from the current data rather than reloading entire page
export const rowDelete = (key, id) => {
  return dispatchAction('GRID_' + key + '_DELETE_ROW', {id});
};
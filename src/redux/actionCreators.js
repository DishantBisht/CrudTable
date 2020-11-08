import { baseUrl } from '../shared/baseUrl';

export const fetchRows = () => (dispatch) => {

    dispatch(rowsLoading(true));

    return fetch(baseUrl + 'rows')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(rows => dispatch(addRows(rows)))
    .catch(error => dispatch(rowsFailed(error.message)));
}

export const rowsLoading = () => ({
    type: "ROWS_LOADING"
});

export const rowsFailed = (errmess) => ({
    type: "ROWS_FAILED",
    payload: errmess
});

export const addRows = (rows) => ({
    type: "ADD_ROWS",
    payload: rows
});

export const postRow = (name, description) => (dispatch) => {
  const newRow = {
      name: name,
      description: description
  };
  
  return fetch(baseUrl + 'rows', {
      method: "POST",
      body: JSON.stringify(newRow),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(addRows(response)))
  .catch(error =>  { console.log('post rows', error.message); alert('Your row could not be posted\nError: '+error.message); });
};

export const deleteRow = (rowId) => (dispatch) => {
  
  return fetch(baseUrl + 'rows/' + rowId, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(fetchRows()))
  .catch(error =>  { console.log('post rows', error.message); alert('Your row could not be deleted\nError: '+error.message); });
};

export const putRow = (rowId ,name, description) => (dispatch) => {
  const newRow = {
      name: name,
      description: description
  };
  
  return fetch(baseUrl + 'rows/'+ rowId, {
      method: "PUT",
      body: JSON.stringify(newRow),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(fetchRows()))
  .catch(error =>  { console.log('put rows', error.message); alert('Your row could not be updated\nError: '+error.message); });
};
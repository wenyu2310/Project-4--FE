const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/parks`;

const indexAllMailingLists = async () => {
  try {
    
    const res = await fetch(`${BASE_URL}/all-mailinglist`, {
      method: 'GET',
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) {
      // This will read the error response from the server
      const errorData = await res.text();
      console.error(`Server responded with ${res.status}:`, errorData);
      throw new Error(`HTTP error! Status: ${res.status}, Response: ${errorData}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("Error in indexMailingList:", error);
    throw error; // Re-throw to let calling code handle it
  }
};

const createMailer = async ( parkId) => {
  try {
    console.log("Sending data:",parkId);
    const res = await fetch(`${BASE_URL}/${parkId}/mailinglist`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const checkSubscription = async (parkId) => {
  try {
    const response = await fetch(`/api/parks/${parkId}/mailinglist/check`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // This includes cookies for auth if needed
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.err || 'Failed to check subscription');
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const indexParkmailinglist = async (parkId) => {
  try {
    const res = await fetch (`${BASE_URL}/${parkId}/mailinglist`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    return res.json();
} catch (error) {
    console.log(error);
}
};


const deleteMailer = async (parkId, mailerId) => {
  try {
      const res = await fetch(`${BASE_URL}/${parkId}/mailinglist/${mailerId}`, {
          method: 'DELETE',
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      });
      return res.json();
  } catch (error) {
      console.error('Error deleting Feedback', error);
      throw error;
  }
};


const updateMailer = async (parkId, mailerId, mailerFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${parkId}/mailinglist/${mailerId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mailerFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


export default{
    indexAllMailingLists,
    indexParkmailinglist,
    createMailer,
    deleteMailer,
    updateMailer,
    checkSubscription

}
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/parks`;

const indexAllFeedbacks = async () => {
  try {
    
    const res = await fetch(`${BASE_URL}/all-feedbacks`, {
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
    console.error("Error in indexFeedback:", error);
    throw error; // Re-throw to let calling code handle it
  }
};

const createFeedback = async ( parkId,feedbackFormData) => {
  try {
    console.log("Sending data:", feedbackFormData,parkId);
    const res = await fetch(`${BASE_URL}/${parkId}/feedbacks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
const indexParkFeedbacks = async (parkId) => {
  try {
    const res = await fetch (`${BASE_URL}/${parkId}/feedbacks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    return res.json();
} catch (error) {
    console.log(error);
}
};

const showFeedback = async (parkId, feedbackId) => {
  try {
      const res = await fetch(`${BASE_URL}/${parkId}/feedbacks/${feedbackId}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      });
      return res.json();
  } catch (error) {
      console.error('Error retriving Feedback', error);
      throw error;
  }
};

const deleteFeedback = async (parkId, feedbackId) => {
  try {
      const res = await fetch(`${BASE_URL}/${parkId}/feedbacks/${feedbackId}`, {
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


const updateFeedback = async (parkId, feedbackId, feedbackFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${parkId}/feedbacks/${feedbackId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


export default{
    indexAllFeedbacks,
    indexParkFeedbacks,
    createFeedback,
    showFeedback,
    deleteFeedback,
    updateFeedback,

}
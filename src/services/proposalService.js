const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/parks`;

const indexAllProposals = async () => {
  try {
    
    const res = await fetch(`${BASE_URL}/all-proposals`, {
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
    console.error("Error in indexProposal:", error);
    throw error; // Re-throw to let calling code handle it
  }
};

const createProposal = async ( parkId,proposalFormData) => {
  try {
    console.log("Sending data:", proposalFormData,parkId);
    const res = await fetch(`${BASE_URL}/${parkId}/proposals`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proposalFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
const indexParkProposals = async (parkId) => {
  try {
    const res = await fetch (`${BASE_URL}/${parkId}/proposals`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    return res.json();
} catch (error) {
    console.log(error);
    return [];
}
};

const showProposal = async (parkId, proposalId) => {
  try {
      const res = await fetch(`${BASE_URL}/${parkId}/proposals/${proposalId}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      });
      return res.json();
  } catch (error) {
      console.error('Error retriving proposal', error);
      throw error;
  }
};

const deleteProposal = async (parkId, proposalId) => {
  try {
      const res = await fetch(`${BASE_URL}/${parkId}/proposals/${proposalId}`, {
          method: 'DELETE',
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      });
      return res.json();
  } catch (error) {
      console.error('Error deleting proposal', error);
      throw error;
  }
};


const updateProposal = async (parkId, proposalId, proposalFormData) => {
  try {
    console.log("Updating proposal:", {
      url: `${BASE_URL}/${parkId}/proposals/${proposalId}`,
      method: 'PUT',
      token: localStorage.getItem('token') ? 'Present' : 'Missing',
      data: proposalFormData
    });

    const res = await fetch(`${BASE_URL}/${parkId}/proposals/${proposalId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proposalFormData),
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Server error (${res.status}):`, errorText);
      throw new Error(`HTTP error! Status: ${res.status}, Response: ${errorText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("Error in updateProposal:", error);
    throw error;
  }
};

const createLike = async (parkId, proposalId, likeFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${parkId}/proposals/${proposalId}/likes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(likeFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteLike = async (parkId, proposalId) => {
  try {
      const res = await fetch(`${BASE_URL}/${parkId}/proposals/${proposalId}/likes/${likeId}`, {
          method: 'DELETE',
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      });
      return res.json();
  } catch (error) {
      console.error('Error deleting like', error);
      throw error;
  }
};

export {
    indexAllProposals,
    indexParkProposals,
    createProposal,
    showProposal,
    deleteProposal,
    updateProposal,
    createLike,
    deleteLike

}
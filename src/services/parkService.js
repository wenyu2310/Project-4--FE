const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/parks`;

const index = async () => {
    try {
        const res = await fetch (BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const show = async(parkId) => {
    try {
        const res = await fetch(`${BASE_URL}/${parkId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const create = async(parkFormData) => {
try {

  console.log("BASE_URL in create:", BASE_URL); // Log BASE_URL
  console.log("parkFormData in create:", ideaFormData); // Log ideaFormData
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(parkFormData),
    });
    return res.json();
} catch (error) {
    console.log(error);
    }
};



export default {
    index,
    show,
    create,
}
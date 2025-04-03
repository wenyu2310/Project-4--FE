import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as parkService from "../../services/parkService";
import * as feedbackService from "../../services/feedbackService"

const FeedbackForm = (props) => {
  const { feedbackId, parkId } = useParams(null);
  const [feedbackFormData, setFormData] = useState({
    subject:'',
    text: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPark = async () => {
      const parkData = await parkService.show(parkId);
      setPark(parkData);
    };
    // const fetchProposal = async () => {
    //   const proposalData = await proposalService.showProposals(feedbackId);
    //   setPark(parkData);
    // };

    if (parkId && feedbackId) fetchPark();
  }, [parkId, feedbackId]);

  const handleChange = (evt) => {
    setFormData({ ...feedbackFormData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (parkId && feedbackId) {
      feedbackService.updateFeedback(parkId, feedbackId, feedbackFormData);
      navigate(`/parks/${parkId}`);
    } else {
      console.log(feedbackFormData)
      props.handleAddFeedback(feedbackFormData,{parkId});
      setFormData({    subject:'',
        text: '', });
    }
  };

  return (
    <div
      className={`bg-gray-50 rounded-lg  p-6 `} // Conditional padding
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <div>
              <label
                htmlFor="subject"
                className="block text-lg font-medium text-gray-700"
              >
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                value={feedbackFormData.subject}
                name="subject"
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-4 border-gray-300 focus:outline-none focus:ring-0"
  
              />
            </div>
            <br/>
          <label htmlFor='text-input' className="block text-lg font-medium text-gray-700">Feedback:</label>
          <textarea
            required
            name='text'
            id='text-input'
            value={feedbackFormData.text}
            onChange={handleChange}
            rows="8"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type='submit'
            className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full"
          >
            SEND FEEDBACK
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
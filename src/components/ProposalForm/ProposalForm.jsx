import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as parkService from "../../services/parkService";
import * as proposalService from "../../services/proposalService"

const ProposalForm = (props) => {
  const { proposalId, parkId } = useParams(null);
  const [formData, setFormData] = useState({
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
    //   const proposalData = await proposalService.showProposals(proposalId);
    //   setPark(parkData);
    // };

    if (parkId && proposalId) fetchPark();
  }, [parkId, proposalId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (parkId && proposalId) {
      parkService.updateProposal(parkId, proposalId, formData);
      navigate(`/parks/${parkId}`);
    } else {
      console.log(formData)
      props.handleAddProposal(formData,{parkId});
      setFormData({    subject:'',
        text: '', });
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${proposalId ? 'pt-20' : ''}`} // Conditional padding
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                name="subject"
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-4 border-gray-300 focus:outline-none focus:ring-0"
  
              />
            </div>
            <br/>
          <label htmlFor='text-input' className="block text-sm font-medium text-gray-700">Proposal Details:</label>
          <textarea
            required
            name='text'
            id='text-input'
            value={formData.text}
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
            SHARE PARTNERSHIP PROPOSAL
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProposalForm;
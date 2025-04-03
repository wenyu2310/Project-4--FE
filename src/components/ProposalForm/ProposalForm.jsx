import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as parkService from "../../services/parkService";
import * as proposalService from '../../services/proposalService';
import NavBar from '../NavBar/NavBar';

const ProposalForm = (props) => {
  const { proposalId, parkId } = useParams(null);
  const [proposalFormData, setFormData] = useState({
    subject:'',
    text: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // const fetchPark = async () => {
    //   const parkData = await parkService.show(parkId);
    //   setPark(parkData);
    // };
    const fetchProposal = async () => {
      const proposalData = await proposalService.showProposal(parkId, proposalId);
      setFormData(proposalData);
    };

    if (parkId && proposalId) fetchProposal();
  }, [parkId, proposalId]);

  const handleChange = (evt) => {
    setFormData({ ...proposalFormData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (parkId && proposalId) {
      proposalService.updateProposal(parkId, proposalId, proposalFormData);
      navigate(`/parks/${parkId}/proposals/${proposalId}`);
    } else {
      console.log(proposalFormData)
      props.handleAddProposal(proposalFormData,{parkId});
      setFormData({    subject:'',
        text: '', });
    }
  };


  return (
    <>
    <NavBar/>

      <div className="relative z-10 mx-auto px-4 text-center text-green-800">
        <div className="py-8">
          <h2 className="text-5xl font-semibold mt-8 mb-">{proposalId ? 'Edit Proposal' : 'New Proposal'}</h2>
</div></div><div className="py-8">
</div>
<main className="text-green-800 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                value={proposalFormData.subject}
                name="subject"
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-4 border-gray-300 focus:outline-none focus:ring-0"
  
              />
            </div>
            <br/>
          <label htmlFor='text-input' className="block text-lg font-medium text-gray-700">Proposal Details:</label>
          <textarea
            required
            name='text'
            id='text-input'
            value={proposalFormData.text}
            onChange={handleChange}
            rows="12"
            className="mt-1 mb-8 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type='submit'
            className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mb-8 rounded-full"
          >
            SHARE PARTNERSHIP PROPOSAL
          </button>
        </div>
      </form>
      </main>

    </>
  );
};

export default ProposalForm;
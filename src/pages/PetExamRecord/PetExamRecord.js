import './PetExamRecord.css';
import Header from '../../components/Doctor/Header/Header.js';
import React, { useState } from 'react';
import ConfirmationModal from '../../components/Confirm-Cancel/ConfirmationModal.js'; // Adjust the path as needed

function PetExamRecord() {
  const [showModal, setShowModal] = useState(false);

  const renderPetData = [
    {
      id: 'PET01',
      type: 'Dog',
      weight: '10 kg',
      name: 'Jack',
      owner: 'Messi',
      gender: 'Male',
    },
    {
      id: 'PET02',
      type: 'Cat',
      weight: '5 kg',
      name: 'Luna',
      owner: 'Ronaldo',
      gender: 'Female',
    },
    {
      id: 'PET03',
      type: 'Bird',
      weight: '0.5 kg',
      name: 'Tweety',
      owner: 'Neymar',
      gender: 'Male',
    },
    {
      id: 'PET04',
      type: 'Rabbit',
      weight: '2 kg',
      name: 'Bunny',
      owner: 'Mbappe',
      gender: 'Female',
    },
    {
      id: 'PET05',
      type: 'Cat',
      weight: '0.2 kg',
      name: 'Nemo',
      owner: 'Salah',
      gender: 'Unknown',
    },
  ];

  const selectedPetIndex = 0;
  const selectedPet = renderPetData[selectedPetIndex];

  const handleCancelClick = e => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    window.location.href = 'work-schedule';
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Header />
      <div className='petExam'>
        <div>
          <div>
            <div className='petE-head'>
              <div className='petE-tittle'>Pet Exam Record</div>
              <div className='petE-tittle-1'>
                Receive a examination pool for pet
              </div>
            </div>
          </div>
        </div>
        <form className='form-petE'>
          <div className='form-petExam'>
            <div className='pet-info-1'>Pet ID</div>
            <div className='petE-info'>{selectedPet.id}</div>
          </div>
          <div className='form-petExam-1'>
            <div className='pet-info-1'>Pet Type</div>
            <div className='petE-info'>{selectedPet.type}</div>
          </div>
          <div className='form-petExam-2'>
            <div className='pet-info-1'>Pet Weight</div>
            <div className='petE-info'>{selectedPet.weight}</div>
          </div>
          <div className='form-petExam'>
            <div className='pet-info-1'>Pet Name</div>
            <div className='petE-info'>{selectedPet.name}</div>
          </div>
          <div className='form-petExam-1'>
            <div className='pet-info-1'>Pet Owner</div>
            <div className='petE-info'>{selectedPet.owner}</div>
          </div>
          <div className='form-petExam-2'>
            <div className='pet-info-1'>Pet Gender</div>
            <div className='petE-info'>{selectedPet.gender}</div>
          </div>
          <div className='form-petExam-3'>
            <div className='pet-info-1'>Pet Diagnostic</div>
            <textarea
              className='petE-control'
              placeholder='Enter Diagnostic'
            ></textarea>
          </div>
          <div className='form-petExam-3'>
            <div className='pet-info-1'>Pet Symptoms</div>
            <textarea
              className='petE-control'
              placeholder='Enter Symptoms'
            ></textarea>
          </div>
          <div className='form-petExam-3'>
            <div className='pet-info-1'>Prescription</div>
            <textarea
              className='petE-control'
              placeholder='Enter prescription'
            ></textarea>
          </div>
          <div className='form-petExam-3'>
            <div className='pet-info-1'>Note</div>
            <textarea
              className='petE-control'
              placeholder='Enter note'
            ></textarea>
          </div>
          <div className='final-petE'>
            <a
              href='work-schedule'
              className='btn-save'
            >
              Save
            </a>
            <a
              href='work-schedule'
              className='btn-cancel'
              onClick={handleCancelClick}
            >
              Cancel
            </a>
          </div>
        </form>
        <div>
          <div className='petE-tittle-2'>
            ----------Information Pet----------
          </div>
        </div>
      </div>
      <ConfirmationModal
        show={showModal}
        message='Are you sure you want to cancel?'
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default PetExamRecord;

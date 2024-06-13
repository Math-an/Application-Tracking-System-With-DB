import React, { useState, useEffect } from 'react';
import { Input, Select, Image } from 'antd';
import jsonData from '../data/states-and-districts.json';
import Nav from "../components/nav";
import Jobnav from "../components/jobnav";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

function Viewapplication() {
  const [formData, setFormData] = useState(null);
  const [editable, setEditable] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/viewapplication/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching application data:', error);
      }
    };

    fetchApplicationData();
  }, [id]);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/edit/${id}`, formData);
      console.log(response.data);
      setEditable(false);
    } catch (error) {
      console.error('Error updating application data:', error);
    }
  };

  const handleChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  return (
    <div className="background">
      <Nav />
      <Jobnav />
      <div className="grid grid-cols-12">
        <div className="col-span-3 mt-5">
          <Image width={200} src={formData?.img || ''} />
          <p className="mt-5 ml-20">Profile Image </p>
          {editable ? (
            <button onClick={handleSubmit} className="bg-green-500 text-white rounded-md text-sm hover:bg-green-900 h-12 w-28 ml-20 mt-16">
              Submit
            </button>
          ) : (
            <button onClick={handleEdit} className="bg-blue-500 text-white rounded-md text-sm hover:bg-blue-900 h-12 w-28 ml-20 mt-16">
              Edit
            </button>
          )}
        </div>
        <div className='col-span-1 mt-5'></div>
        <div className="col-span-2 mt-5">
          <label className="text-sm relative top-5">First Name</label>
          <Input
            value={formData?.firstName || ''}
            onChange={e => handleChange('firstName', e.target.value)}
            readOnly={!editable}
            className="mt-5 w-[16rem]"
          />
          <label className="text-sm relative top-5">Last Name</label>
          <Input
            value={formData?.lastName || ''}
            onChange={e => handleChange('lastName', e.target.value)}
            readOnly={!editable}
            className="mt-5 w-[16rem]"
          />
          <label className="text-sm relative top-5">D.O.B</label>
          <Input
            type="date"
            value={formData?.dob || ''}
            onChange={e => handleChange('dob', e.target.value)}
            readOnly={!editable}
            className="mt-5 w-[16rem]"
          />
          <label className="text-sm relative top-5">Select the Gender</label>
          <Select
            value={formData?.gender || ''}
            onChange={value => handleChange('gender', value)}
            disabled={!editable}
            className="w-[16rem] mt-5"
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Trans">Trans</Option>
          </Select>
          <label className="text-sm relative top-5">Job Role</label>
          <Select
            value={formData?.job || ''}
            onChange={value => handleChange('job', value)}
            disabled={!editable}
            className="w-[16rem] mt-5"
          >
            <Option value="BE">BE</Option>
            <Option value="BSc">BSc</Option>
            <Option value="DME">DME</Option>
          </Select>
          <label className="text-sm relative top-5">Highest Qualification</label>
          <Input
            value={formData?.qualification || ''}
            onChange={e => handleChange('highestQualification', e.target.value)}
            readOnly={!editable}
            className="mt-5 w-[16rem]"
          />
        </div>
        <div className='col-span-1 mt-5'></div>
        <div className="col-span-2 mt-5">
          <label className="text-sm relative top-5">Mobile No</label>
          <Input
            type="number"
            value={formData?.mobile || ''}
            onChange={e => handleChange('mobileNo', e.target.value)}
            readOnly={!editable}
            className="mt-5 w-[16rem]"
          />
          <label className="text-sm relative top-5">E-Mail</label>
          <Input
            type="email"
            value={formData?.email || ''}
            onChange={e => handleChange('email', e.target.value)}
            readOnly={!editable}
            className="mt-5 w-[16rem]"
          />
          <label className="text-sm relative top-5">Select the State</label>
          <Select
            value={formData?.state || ''}
            onChange={value => handleChange('state', value)}
            disabled={!editable}
            className="w-[16rem] mt-5"
          >
            {jsonData.states.map(state => (
              <Option key={state.state} value={state.state}>{state.state}</Option>
            ))}
          </Select>
          <label className="text-sm relative top-5">Select the District</label>
          <Select
            value={formData?.district || ''}
            onChange={value => handleChange('district', value)}
            disabled={!editable || !formData?.state}
            className="w-[16rem] mt-5"
          >
            {formData?.state && jsonData.states.find(state => state.state === formData.state).districts.map(district => (
              <Option key={district} value={district}>{district}</Option>
            ))}
          </Select>
          <label className="text-sm relative top-5">Technology</label>
          <Input
            value={formData?.technology || ''}
            onChange={e => handleChange('technology', e.target.value)}
            readOnly={!editable}
            className="mt-5 w-[16rem]"
          />
          <label className="text-sm relative top-5">Preferred Technology</label>
          <Input
            value={formData?.preferredTechnology || ''}
            onChange={e => handleChange('preferredTechnology', e.target.value)}
            readOnly={!editable}
            className="mt-5 w-[16rem]"
          />
        </div>
        <div className='col-span-1 mt-5'></div>
        <div className="col-span-2 mt-5">
          <label className="text-sm relative top-5">Project</label>
          <Input
            value={formData?.project || ''}
            onChange={e => handleChange('project', e.target.value)}
            readOnly={!editable}
            className="mt-5 w-[16rem]"
          />
          <label className="text-sm relative top-5">Project Description</label>
          <TextArea
            value={formData?.projectDescription || ''}
            onChange={e => handleChange('projectDescription', e.target.value)}
            readOnly={!editable}
            className="mt-5 w-[16rem]"
            rows={15}
          />
        </div>
        <p className="text-red-500 relative bottom-10 text-sm text-center font-bold mt-24">Note: Make sure not to give wrong information, as mistakes may lead to rejection.</p>
      </div>
    </div>
  );
}

export default Viewapplication;

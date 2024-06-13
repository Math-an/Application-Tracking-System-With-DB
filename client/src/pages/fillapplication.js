import React, { useState, useRef } from 'react';
import { Upload, Image, Input, DatePicker, Select,Tag } from 'antd'; // Remove Option from here
import ImgCrop from 'antd-img-crop';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import Nav from "../components/nav";
import Jobnav from "../components/jobnav";
import "../style/common.css";
import jsonData from "../data/states-and-districts.json";
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;
const { TextArea } = Input;

function Fillapplication() {
  const [formData, setFormData] = useState({
    id: uuidv4(), // Generate random ID for form submission
    img:'',
    date: Date(),
    firstName: '',
    lastName: '',
    dob: null,
    gender: '',
    job: '',
    qualification: '',
    mobile: '',
    email: '',
    state: '',
    district: '',
    technology: '',
    preferredTechnology: '',
    project: '',
    projectDescription: '',
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChange2 = (key, value) => {
    
    setFormData(prevData => ({
      ...prevData
    }));
  };
  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/api/fillapplication', formData);
      alert('Application submitted successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error in submitting', error);
      alert('Failed to submit application. Please try again.');
    }
  };
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src && file.preview) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };


  const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };


    const handleChange = (value) => {
        console.log(`selected ${value}`);
      };

     
const { Option } = Select;
      const [selectedState, setSelectedState] = useState('');
      const [selectedDistrict, setSelectedDistrict] = useState('');
      const [districts, setDistricts] = useState([]);
    
      const handleStateChange = (value) => {
        setSelectedState(value);
        const selectedStateData = jsonData.states.find(state => state.state === value);
        setDistricts(selectedStateData.districts);
        setSelectedDistrict('');
      };
    
      const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
      };



  return (

    <div className="background">
    <Nav />
    <Jobnav />
    <div className="grid grid-cols-12">
      <div className="col-span-3 mt-5 ">
        <div className="ml-20 mt-5">
          <ImgCrop>
            <Upload
              className=""
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length >= 1 ? null : '+ Upload'}
            </Upload>
          </ImgCrop>
        </div>
        <p className="mt-5 ml-20">Profile Image </p>
        <div className='bg-blue-500 text-white rounded-md flex justify-center align-middle text-sm hover:bg-blue-900 h-12 w-28 ml-20 mt-16'>
          <Toast className='mt-5' ref={toast}></Toast>
          <FileUpload
            className='mt-3'
            mode="basic"
            name="demo[]"
            url="/api/upload"
            accept="image/*"
            maxFileSize={1000000}
            onUpload={onUpload}
          />
        </div>
        <button onClick={handleSubmit} className="bg-green-500 text-white rounded-md text-sm hover:bg-green-900 h-12 w-28 ml-20 mt-16">Submit</button>
      </div>
      <div className='col-span-2 mt-5'>
        <label className='text-sm relative top-5'>First Name</label>
        <Input className='mt-5 w-[16rem]' placeholder='First Name' onChange={(e) => handleInputChange('firstName', e.target.value)} />
        <label className='text-sm relative top-5'>Last Name</label>
        <Input className='mt-5 w-[16rem]' placeholder='Last Name' onChange={(e) => handleInputChange('lastName', e.target.value)} />
        <label className='text-sm relative top-5'>D.O.B</label>
        <DatePicker 
  className='mt-5 w-[16rem]' 
  placeholder="D.O.B" 
  onChange={(date) => handleChange2('dob', date ? date.format('YYYY-MM-DD') : null)} 
/>
        <label className='text-sm relative top-5'>Select the Gender</label>
        <Select
          placeholder="Select the Gender"
          className='w-[16rem] mt-5'
          onChange={(value) => handleInputChange('gender', value)}
          options={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Trans', label: 'Trans' }
          ]}
        />
        <label className='text-sm relative top-5'>Select Job</label>
        <Select
          placeholder="Select Job"
          className='w-[16rem] mt-5'
          onChange={(value) => handleInputChange('job', value)}
          options={[
            { value: 'Web Developer', label: 'Web Developer' },
            { value: 'AIML Developer', label: 'AIML Developer' },
            { value: 'Business Analyst', label: 'Business Analyst' },
            {value:'Accountant',label:'Accountant'}
          ]}
        />
        <label className='text-sm relative top-5'>Highest Qualification</label>
        <Input className='mt-5 w-[16rem]' placeholder='Highest Qualification' onChange={(e) => handleInputChange('qualification', e.target.value)} />
      </div>
      <div className='col-span-1'></div>
      <div className='col-span-2 mt-5'>
        <label className='text-sm relative top-5'>Mobile No</label>
        <Input className='mt-5 w-[16rem]' type='number' placeholder='Mobile Number' onChange={(e) => handleInputChange('mobile', e.target.value)} />
        <label className='text-sm relative top-5'>E-Mail</label>
        <Input className='mt-5 w-[16rem]' type='email' placeholder='Email' onChange={(e) => handleInputChange('email', e.target.value)} />
        <label className='text-sm relative top-5'>Select the State</label>
        <Select
          placeholder="Select"
          className='w-[16rem] mt-5'
          onChange={(value) => handleInputChange('state', value)}
        >
          {jsonData.states.map((state, index) => (
            <Option key={index} value={state.state}>{state.state}</Option>
          ))}
        </Select>

        {selectedState && (
          <div>
            <label className='text-sm relative top-5'>Select the District</label>
            <Select
              id="districts"
              value={selectedDistrict}
              className='w-[16rem] mt-5'
              onChange={(value) => handleInputChange('district', value)}
            >
              <Option value="">Select the District</Option>
              {jsonData.states
                .find((state) => state.state === selectedState)
                .districts.map((district, index) => (
                  <Option key={index} value={district}>
                    {district}
                  </Option>
                ))}
            </Select>
          </div>
        )}

        <label className='text-sm relative top-5'>Technology</label>
        <Input className='mt-5 w-[16rem]' placeholder='Any one Well Known Technology' onChange={(e) => handleInputChange('technology', e.target.value)} />
        <label className='text-sm relative top-5'>Prefered Technology</label>
        <Input className='mt-5 w-[16rem]' placeholder='Prefering Technology' onChange={(e) => handleInputChange('preferredTechnology', e.target.value)} />
      </div>

      <div className='col-span-1 mt-5'></div>
      <div className='col-span-2 mt-5'>
        <label className='text-sm relative top-5'>Project</label>
        <Input className='mt-5 w-[16rem]' placeholder='Any one Project You did' onChange={(e) => handleInputChange('project', e.target.value)} />
        <label className='text-sm relative top-5'>Project Description</label>
        <TextArea className=' mt-5 w-[16rem]' rows={15} placeholder="Describe your project in paragraph" onChange={(e) => handleInputChange('projectDescription', e.target.value)} />

        <div>
        </div>
      </div>
    </div>
    <p className='text-red-500 relative bottom-10 text-sm text-center font-bold mt-24'>Note : Make sure not to give a wrong information , or else mistake information it will may lead to the rejection.</p>
  </div>
);
}

export default Fillapplication;

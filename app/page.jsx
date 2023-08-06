"use client"

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import React, { useState } from 'react';

export default () => {
    const [content, setContent] = useState('');
    const handleChange = (value) => {
        setContent(value);
      };
      
      return (
        <div>
          <ReactQuill value={content} onChange={handleChange} />
        </div>
      );
      
};
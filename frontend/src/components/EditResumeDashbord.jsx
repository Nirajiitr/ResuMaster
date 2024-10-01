import React from 'react'
import FormSection from './FormSection'
import ResumePreview from './ResumePreview'
import ResumeInfoContext from '../context/ResumeInfoContext'

const EditResumeDashbord = () => {
  return (
    <ResumeInfoContext.Provider value={{}}>
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <ResumePreview />
      </div>
      </ResumeInfoContext.Provider>
  )
}

export default EditResumeDashbord
import { QuestionForm } from '@/components/forms/Question'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
      <div className="mt-9">
        <Suspense>
          <QuestionForm userId={""} formType="create" />
        </Suspense>
      </div>
    </div>
  )
}

export default page
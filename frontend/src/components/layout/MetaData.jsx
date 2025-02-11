import React from 'react'
import { HelmetProvider, Helmet } from "react-helmet-async";

const MetaData = ({ title }) => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>
            Byte |  {title}
          </title>
        </Helmet>
      </HelmetProvider>
    </div>
  )
}

export default MetaData
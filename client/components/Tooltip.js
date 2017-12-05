import React from 'react'
import { Icon, Popup } from 'semantic-ui-react'

import { descriptionForField } from '../utils/fieldDescriptions'

const Tooltip = ({type, field, style}) => {
  const content = descriptionForField(type,field)
  
  if(content) {
    return(
      <Popup
          trigger={<Icon style={style} name='help circle' color='grey'/>}
          content={content}
      />
    )    
  }
  else {
    return(null)
  }
  
}

export default Tooltip
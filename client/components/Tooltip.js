import React from 'react'
import { Icon, Popup } from 'semantic-ui-react'

import { descriptionForField } from '../utils/fieldDescriptions'

const Tooltip = ({type, field, style}) => {
  const content = descriptionForField(type,field)
  
  if(content) {
    return(
      <Popup
          trigger={<Icon style={Object.assign({},style,{marginLeft: '4px'})} name='help circle'/>}
          content={content}
      />
    )    
  }
  else {
    return(null)
  }
  
}

export default Tooltip
import React from 'react'
import { Button, message, Space } from 'antd';
import flashservice from 'components/Flash/flashservice'
const FlashMessage = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = (props) => {
      messageApi.open({
        type: props.type,
        content: props.message
        
      });
    };  
    flashservice.flash=success.bind(this)
  return (
    <div>
        {contextHolder}
    </div>
  )
}

export default FlashMessage

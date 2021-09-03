import { Button, Result } from 'antd'
import React from 'react'

const OrderSuccess = () => {
    return (
        <div>
            <Result
                status="success"
                title="Order Successfully added !"
                extra={[
                    <Button onClick={() => window.location.href = '/clientorders'} type="primary" key="console">
                        See Orders
                    </Button>,
                    <Button onClick={() => window.location.href = '/shop'} type="primary" key="console">
                        Continue Shopping
                    </Button>
                ]}
            />
        </div>
    )
}

export default OrderSuccess

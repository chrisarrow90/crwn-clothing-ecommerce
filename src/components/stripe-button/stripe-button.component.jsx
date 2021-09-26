import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100
  const publishableKey =
    'pk_test_51JdqYTDj6Y6XlxJZleGHv3r1SZcPpNgmtJt05ZpB78Tg6BzQ2MVXXzT8HEifgHEfDYwpPb9JzNTWcm2kbk8MQtts002ZkqueNf'

  const onToken = (token) => {
    console.log(token)
    alert('Payment successful')
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      currency="NZD"
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton

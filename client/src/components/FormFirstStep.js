import React, { useEffect, useState } from 'react'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
  customerName: Yup.string()
    .min(3, 'Customer Name must be 3 characters at minimum')
    .required('Customer Name is required'),
  customerId: Yup.string().min(
    3,
    'Customer Id must be 3 characters at minimum'
  ),

  amount: Yup.number()
    .label('Output Limit')
    .nullable(true)
    .integer()
    .min(3, 'Amount must be 3 at minimum')
    .required('Amount  is required'),
})

function FormFirstStep({ form, hash, transitionId, onSubmit }) {
  const [cusId, setCusId] = useState('')

  useEffect(() => {
    setCusId(new Date().getTime().toString(36))
  }, [])

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          customerName: form.customerName || '',
          customerId: cusId || '',
          amount: form.amount || '',
        }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <div>
            <Form className="form">
              <div className="form-group">
                <h3>Order Products</h3>
                <label htmlFor="customerName" className="label">
                  Customer Name
                </label>

                <Field
                  type="customerName"
                  name="customerName"
                  placeholder="Customer Name"
                  autoComplete="on"
                  className={`mt-2 form-control ${
                    props.touched.customerName && props.errors.customerName
                      ? 'is-invalid'
                      : ''
                  }`}
                />

                <ErrorMessage
                  component="div"
                  name="customerName"
                  className="invalid-feedback"
                />

                <label htmlFor="customerId" className="label">
                  Customer Id
                </label>
                <Field
                  type="customerId"
                  name="customerId"
                  disabled
                  value={cusId}
                  placeholder="Customer Id"
                  autoComplete="on"
                  className={`mt-2 form-control ${
                    props.touched.customerId && props.errors.customerId
                      ? 'is-invalid'
                      : ''
                  }`}
                />

                <ErrorMessage
                  component="div"
                  name="customerId"
                  className="invalid-feedback"
                />

                <label htmlFor="amount" className="label">
                  Amount
                </label>
                <Field
                  type="amount"
                  name="amount"
                  placeholder="Amount"
                  autoComplete="off"
                  className={`mt-2 form-control ${
                    props.touched.amount && props.errors.amount
                      ? 'is-invalid'
                      : ''
                  }`}
                />

                <ErrorMessage
                  component="div"
                  name="amount"
                  className="invalid-feedback"
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  // disabled={props.isSubmitting}
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      {/*  */}
      <form action="https://test.payu.in/_payment" method="post">
        <input type="hidden" name="key" value={'gtKFFx'} />
        <input type="hidden" name="txnid" value={transitionId} />
        <input type="hidden" name="productinfo" value={'Testing_Product'} />
        <input type="hidden" name="customerName" value={form.customerName} />
        <input type="hidden" name="email" value="test@gmail.com" />
        <input type="hidden" name="firstname" value="Ashish" />
        <input type="hidden" name="lastname" value="Kumar" />
        <input type="hidden" name="amount" value={form.amount} />
        <input
          type="hidden"
          name="surl"
          value="https://locolhost:8080/api/payu/success"
        />
        <input
          type="hidden"
          name="furl"
          value="https://locolhost:8080/api/payu/success"
        />

        <input type="hidden" name="udf1" value={'details1'} />
        <input type="hidden" name="udf2" value={'details2'} />
        <input type="hidden" name="udf3" value={'details3'} />
        <input type="hidden" name="udf4" value={'details4'} />
        <input type="hidden" name="udf5" value={'details5'} />

        <input type="hidden" name="hash" value={hash} />
        <button
          type="submit"
          value="submit"
          className="btn btn-primary btn-block mt-4"
          disabled={!hash}
        >
          Pay Now
        </button>
      </form>
    </div>
  )
}

export default FormFirstStep

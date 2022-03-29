import React, { useState, useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { publicFetch } from '../../../util/fetcher'
import { AuthContext } from '../../../store/auth'
import ModalContext from '../../../store/modal'
import { Close } from '../../icons'

import FormInput from '../../form-input'
import Button from '../../button'

import './login-form.module.css'

const LoginForm = () => {
  const { ref, setIsComponentVisible } = useContext(ModalContext)

  const { setAuthState } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        setLoading(true)
        try {
          const { data } = await publicFetch.post('authenticate', values)
          const { token, expiresAt, userInfo } = data
          setAuthState({ token, expiresAt, userInfo })
          resetForm({})
          setIsComponentVisible(false)
        } catch (error) {
          setStatus(error.response.data.message)
        }
        setLoading(false)
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required('Required')
          .max(16, 'Must be at most 16 characters long')
          .matches(/^[a-zA-Z0-9_-]+$/, 'Contains invalid characters'),
        password: Yup.string()
          .required('Required')
          .min(6, 'Must be at least 6 characters long')
          .max(50, 'Must be at most 50 characters long')
      })}
    >
      {({
        values,
        errors,
        touched,
        status,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <div>
          <div
            style={{
              display: 'flex',
              padding: '1rem 1rem',
              justifyContent: 'space-between',
              borderBottom: '1px solid #dee2e6',
              borderTopLeftRadius: 'calc(0.3rem - 1px)',
              borderTopRightRadius: 'calc(0.3rem - 1px)',
              alignItems: 'center'
            }}
          >
            <h5
              style={{
                fontWeight: '500',
                marginBlockStart: '1.67em',
                marginBlockEnd: '1.67em'
              }}
            >
              Good to see You again
            </h5>
            <Button
              // className={styles.closeButton}
              onClick={() => setIsComponentVisible((isOpen) => !isOpen)}
            >
              <Close />
            </Button>
          </div>
          <form>
            <label htmlFor="Username" />
            <input
              type="text"
              name="username"
              autoComplete="off"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={touched.username && errors.username}
              errorMessage={errors.username && errors.username}
            />
          </form>
        </div>
      )}
    </Formik>
  )
}

export default LoginForm

// <form onSubmit={handleSubmit} className={styles.form}>
//           <FormInput
//             label="Username"
//             type="text"
//             name="username"
//             autoComplete="off"
//             value={values.username}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             hasError={touched.username && errors.username}
//             errorMessage={errors.username && errors.username}
//           />
//           <FormInput
//             label="Password"
//             type="password"
//             name="password"
//             autoComplete="off"
//             value={values.password}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             hasError={touched.password && errors.password}
//             errorMessage={errors.password && errors.password}
//           />
//           <p className={styles.status}>{status}</p>
//           <Button
//             primary
//             full
//             className={styles.submitButton}
//             type="submit"
//             isLoading={loading}
//             disabled={isSubmitting}
//           >
//             Log in
//           </Button>
//         </form>

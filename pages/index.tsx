import type { NextPage } from 'next'
import Form from '@rjsf/core'
import styles from '../styles/Home.module.css'

import specSchema from '../../governance/validator/N3GOV-v1.json'
import uiSchema from '../uiSchema.json'

const schema = {
  title: 'Todo',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task' },
    done: { type: 'boolean', title: 'Done?', default: false },
  },
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Form schema={specSchema} uiSchema={uiSchema} />
    </div>
  )
}

export default Home

import React from 'react';

import Layout from 'components/common/Layout';
import Card from 'components/common/Card';
import Order from './Order';
import Delivery from './Delivery';
import ProcessStepper from './ProcessStepper';
import {purchaseOrder, delivery} from './stubData';

import './styles.scss';

/*
 * 
  {
      date: '12/12/2020',
      processId: 'ECF-2',
      companyName: 'Mister Cimba',
      statusCode: 3,
      status: 'Payment',
      currentStep: 3,
      data: {
        order:... ,
        delivery: ... ,
        invoice: ... ,
        payment: ... 
      }
   } 
 */

const Process = (props) => {
  const processId = props.match.params.processId;



  return (
    <Layout title={`Process ${processId}`}>
      <div className='processStepperCard'>
        <Card title={`Process ${processId}`}>
          <ProcessStepper activeStp={2} />
        </Card>
      </div>

      <Order orderData={purchaseOrder} title='Order Details' />
      <Delivery delivery={delivery} title='Delivery Details' />
    </Layout>
  );
}


export default Process;

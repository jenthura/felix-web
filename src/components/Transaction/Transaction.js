import React from 'react';
import TransactionForm from '../TransactionForm/TransactionForm'

import { Button } from '../Misc/Misc';
import TransactionsService from '../../services/transactions-service';

import './transaction.css'

export default class Transaction extends React.Component {  

  state = {
    edit: false,
  }

  static defaultProps = {
    transaction : {
      amount: "",
      category: "",
      date_created: "",
      description: "",
      id: 0,
      name: "",
      type: "",
    },
    handleChange : () => {},
    history : {
      push : () => {}
    }
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit })
  }

   handleDelete =()=> {
     const {type, id} = this.props.match.params;
     TransactionsService.deleteSingleTransaction(type,id)
     .then(()=> this.props.history.push('/dashboard'))
   }

   handleSubmit = (ev, data) => {
       ev.preventDefault();
      TransactionsService.updateSingleTransaction(data);
      this.toggleEdit();
   }

   handleCancel = ev => {
       ev.preventDefault();
       this.toggleEdit();
   }

  renderTransaction = () => {
    const {name, date_created, amount, category, description } = this.props.transaction;
    const {type} = this.props.match.params; 
    return(
      !this.state.edit ?
      (
      <div className='transaction_wrapper'>
        <div className='transactionInfo_wrapper'>
          <div className='text_info_divider'>
          <p className='transaction name'>{name}</p>
          <p className='transaction date'>{date_created}</p>
          <p className='transaction category'>{category}</p>
          <p className='transaction description'>{description}</p>
          </div>
          <div className='amount_wrapper'>
            <p className={`transaction ${type} amount`}>${amount}</p>
          </div>
        </div>
        <div className='button_wrapper'>
          <Button
          onClick={this.toggleEdit}
          className='transaction_edit'>
            Edit
          </Button>
          <Button
          onClick={this.handleDelete}
           className='transaction_delete'>
            Delete
          </Button>
        </div>
      </div>
        )
        :
        (
          <>
            <TransactionForm
              handleCancel = {this.handleCancel}
              handleChange = {this.props.handleChange} 
              handleSubmit = {this.handleSubmit}
              transaction = {this.props.transaction} //remove date from props
              editing = {true}
            />
          </>
        )
    )
  }

  
  render(){
    return (
      <div className='transaction_details_wrapper'>
        {this.renderTransaction()}
      </div>
    );
  }
}
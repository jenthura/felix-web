import React from 'react';
import {Button} from '../Misc/Misc'
import TransactionsContext from '../../contexts/TransactionsContext';

/**
 * @todo 1:> hook up api
 *       2:> make sure that it can work for both single transaction AND new transaction
 * 
 * @note Al : "make a form component for both"
 *       me : (눈_눈) "y tho"
 */

export default class TransactionForm extends React.Component {

    static contextType = TransactionsContext;

    componentDidMount = () => {
        if(this.context.transaction.name)this.context.setTransactionForm();       
    }

    handleSubmit = ev => {
        ev.preventDefault();
        console.log(this.context.transactionForm)
    }

    handleChanges = ev =>{
        console.log(this.context.transactionForm)
        const {name , value} = ev.target;
        console.log('name',name, 'value', value) 
        this.context.setTransactionFormChange(name, value)
    }

    handleCancel = ev => {
        ev.preventDefault();
        this.context.setTransactionForm();
    }

    renderOptions = arr =>{
        if(arr.length){
            return arr.map((item, i) => {
                return (
                    <option
                    key={i}
                    name={item}
                    value={item}
                    >
                    {item}
                    </option>
                )
            })
        }
    }

    render(){
       const {name, description, amount, category} = this.context.transactionForm
        
       const optionForType = 
        this.context.type === 'income'
        ?
        ['paycheck', 'freelance', 'side_gig', 'other']
        :
        ['bills', 'transportation', 'food', 'entertainment', 'other']
        ;

        return(
            <div className='transaction_form_wrapper'>
                <form
                onChange={this.handleChanges}
                >

                    <div className='transaction_notes'>

                    {
                        !this.context.transaction.id 
                        && 
                        <>
                            <label htmlFor='transactionType'></label>
                            <select name='type'>
                                {this.renderOptions(['income','expenses'])}
                            </select> 
                        </>

                    }
                      <input name='name' value={name} placeholder='name'></input>
                      <input name='category' value={category} placeholder='category'></input>
                      <select name='category'>
                          {this.renderOptions(optionForType)}
                      </select>
                      <textarea name='description' value={description}placeholder='description'></textarea>

                    </div>
                    <div className='amount_wrapper'>
                      <input name='amount' value={amount} className='amount' placeholder='amount'></input>
                    </div>
                    <Button
                    onSubmit={this.handleSubmit} 
                    className='transaction_submit'>
                      Submit
                    </Button>
                    <Button className='transaction_form_cancel'>
                        Cancel
                    </Button>
                </form>
            </div>
        )
    }
}
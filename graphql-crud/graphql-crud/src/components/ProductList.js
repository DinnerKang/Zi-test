import React, { Component, Fragment } from 'react';
import axios from 'axios';


const endPoint = axios.create({
    baseURL : 'http://test.recruit.croquis.com:28500/',
    headers : {
        'Content-Type' : 'application/json',
        'Croquis-UUID' : '00000000-0000-0000-0000-000000000000'
    }
});


class App extends Component {

    constructor(props){
        super(props);
        this.state={
            supplierList : []
        }
    }

    componentWillMount(){
        this.getSupplierList();
    }
    
    getSupplierList = async() =>{
        const query = `
            {
                supplier_list {
                item_list {
                    id
                    name
                }
                }
            }
        `;
        const supplierList = await endPoint.post('',{query : query});
        this.setState({
            supplierList : supplierList.data.data.supplier_list.item_list
        });
        console.log(this.state.supplierList);
    }
   
    render() {
        return (
            <Fragment>
                <section>
                    <div>
                        <select>
                            {this.state.supplierList.map(
                                (c) => <option value={c.name} key={c.id}>{c.name}</option>
                            )}
                        </select>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default App;

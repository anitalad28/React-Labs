import React, { Component } from 'react';

class ProductComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {            
            ProductId: 0,
            ProductName:"",
            Price:0,
            CategoryName:"",
            Manufacture:"",
            Products:[
                {ProductId:101,ProductName:"Laptop 1",Price:12001,CategoryName: "Electronics 1",Manufacture:"AB Tech 1"},
                {ProductId:102,ProductName:"Laptop 2",Price:12002,CategoryName: "Electronics 2",Manufacture:"AB Tech 2"},
                {ProductId:103,ProductName:"Laptop 3",Price:12003,CategoryName: "Electronics 3",Manufacture:"AB Tech 3"},
                {ProductId:104,ProductName:"Laptop 4",Price:12004,CategoryName: "Electronics 4",Manufacture:"AB Tech 4"},
                {ProductId:105,ProductName:"Laptop 5",Price:12005,CategoryName: "Electronics 5",Manufacture:"AB Tech 5"}
            ],
           // Product:["ProductId","ProductName","Price","CategoryName","Manufacture"],
            Categories:["Electronics","Electrical","Food"],
            Manufactures:["AB Tech","CD Power","EF BEverages"]
        };
    }

    
    // e is an event-paylaod raised on target element
    // We can read the payload data using e
    onChangeProductId(e){
        this.setState({ProductId: e.target.value })
    }

    onChangeProductName(e){
        this.setState({ProductName: e.target.value })
    }

    onChangePrice(e){
        this.setState({Price: e.target.value })
    }

    onChangeCategoryName(e){
        this.setState({CategoryName: e.target.value })
    }

    onChangeManufacturer(e){
        this.setState({Manufacture: e.target.value })
    }

    onClickClear(e){
        this.setState({ ProductId:0 });
        this.setState({ ProductName:"" });
        this.setState({ Price:0 });
        this.setState({ CategoryName:"" });
        this.setState({ Manufacture:"" });
    }

    onClickSave(e){
       // alert(`${this.state.ProductId} ${this.state.ProductName} ${this.state.Price} ${this.state.CategoryName} ${this.state.Manufacture}`)
        //1. Get the copy of the products array using slice
        let tempArray = this.state.Products.slice()
       
        // Push the new record in to the new tempArray
        tempArray.push({
            ProductId: this.state.ProductId,
            ProductName: this.state.ProductName,
            Price: this.state.Price,
            CategoryName: this.state.CategoryName,
            Manufacture: this.state.Manufacture,
        });
        
        // 3. copy the tempArray into products array
        this.setState({ Products: tempArray });
    }   

    getSelectedProduct(p) {
        alert(p);
        this.setState({ ProductId: p.ProductId });
        this.setState({ ProductName: p.ProductName });
        this.setState({ Price: p.Price });
        this.setState({ CategoryName: p.CategoryName });
        this.setState({ Manufacture: p.Manufacture });
    }

    render() {         
        return ( <div className="container">
            <div className="form-group">
                <label htmlFor="ProductId">ProductId</label>
                <input type="text" className="form-control" value={this.state.ProductId} onChange={this.onChangeProductId.bind(this)}></input>
            </div>
            <div className="form-group">
                <label htmlFor="ProductName">ProductName</label>
                <input type="text" className="form-control" value={this.state.ProductName} onChange={this.onChangeProductName.bind(this)}></input>
            </div>
            <div className="form-group">
                <label htmlFor="Price">Price</label>
                <input type="text" className="form-control" value={this.state.Price} onChange={this.onChangePrice.bind(this)}></input>
            </div>
            <div className="form-group">
                <label htmlFor="CategoryName">CategoryName</label>
                <select className="form-control" value={this.state.CategoryName} onChange={this.onChangeCategoryName.bind(this)}>
                    {this.state.Categories.map((c, i) => (
                        <Options key={i} data={c} />
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="Manufacturer">Manufacturer</label>
                <select className="form-control" value={this.state.Manufacture} onChange={this.onChangeManufacturer.bind(this)} >
                    {this.state.Manufactures.map((c, i) => (
                            <Options key={i} data={c} />
                    ))}
                </select>
            </div>
            <table>
                <tbody>
                    <tr>    
                        <td>
                            <input type="button" value="New" className="btn btn-default" onClick={this.onClickClear.bind(this)} />
                        </td>
                        <td>
                            <input type="button" value="Save" className="btn btn-success" onClick={this.onClickSave.bind(this)}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="container">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category Name</th>
                            <th>Manufacture</th>
                        </tr>
                    </thead>
                    <tbody>
                       {this.state.Products.map((prd, idx) => (
                               <TableRow key={idx} row={prd}
                               selected={this.getSelectedProduct.bind(this)}P
                               />                               
                        ))}
                    </tbody>
                </table>
            </div>
        </div> );
    }
}

// Componet that will render <option></option>
// props.data is the data passed from the parent of this component
class Options extends Component {
    render(){
        return(
            <option value={this.props.data}>{this.props.data}</option>
        );
    }
}

class Manufactures extends Component {
    render(){
        return(
            <option value={this.props.data}>{this.props.data}</option>
        );
    }
}

class TableRow extends Component{
    onRowClick(){
        this.props.selected(this.props.row);
    };
    render(){
        
        return(
            <tr onClick={this.onRowClick.bind(this)}>
                <td>{this.props.row.ProductId}</td>
                <td>{this.props.row.ProductName}</td>
                <td>{this.props.row.Price}</td>
                <td>{this.props.row.CategoryName}</td>
                <td>{this.props.row.Manufacture}</td>                
            </tr>
        )
    }
}
 
export default ProductComponent;
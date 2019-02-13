import React, { Component } from 'react';
import ProductService from '../services/service.js';
class ProductComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {            
            ProductId: 0,
            ProductName:"",
            Price:0,
            CategoryName:"",
            Manufacturer:"", 
            Categories:["Electronics","Electrical","Food"],
            Manufactures:["AB Tech","CD Power","EF BEverages"],
            Products: [
                {
                  "Product Id": 0,
                  "Product Name": "",
                  "Price": 0,
                  "Category Name": "",
                  "Manufacturer": "",
                  "Action":""
                }
              ],
              headers: [],
              SortByArray: [
                "ProductId",
                "ProductName",
                "CategoryName",
                "Manufacturer",
                "Price"       
              ]
        };

        this.generateTableHeaders();
        this.serv = new ProductService;
    }

    generateTableHeaders() {
        for (let h in this.state.Products[0]) {
          this.state.headers.push(h);
        }
      }
    
    // e is an event-paylaod raised on target element
    // We can read the payload data using e
    onChangeProduct(e){
        this.setState({[e.target.name]: e.target.value });
    }

    onClickClear(e){
        this.setState({ ProductId:0 });
        this.setState({ ProductName:"" });
        this.setState({ Price:0 });
        this.setState({ CategoryName:"" });
        this.setState({ Manufacturer:"" });
    }    

    onClickSave(e){
        let products = {
            ProductId: this.state.ProductId,
            ProductName: this.state.ProductName,
            Price: this.state.Price,
            CategoryName: this.state.CategoryName,
            Manufacturer: this.state.Manufacturer,
        }

        this.serv
            .postData(products)
            .then(data=>data.json())
            .then(value=>{                                                                  
                console.log(JSON.stringify(value));                
                this.serv
                        .getData()
                        .then(data=>data.json())
                        .then(value=>{
                            this.setState({ Products: value.data });                                                   
                            console.log(JSON.stringify(value));
                        })
                        .catch(error=>{
                            console.log(`Error occurred ${error.status}`);
                        })
            })
            .catch(error=>{
                console.log(`Error occurred ${error.status}`);
            })

        /*
       // alert(`${this.state.ProductId} ${this.state.ProductName} ${this.state.Price} ${this.state.CategoryName} ${this.state.Manufacture}`)
        //1. Get the copy of the products array using slice
        let tempArray = this.state.Products.slice()
       
        // Push the new record in to the new tempArray
        tempArray.push({
            ProductId: this.state.ProductId,
            ProductName: this.state.ProductName,
            Price: this.state.Price,
            CategoryName: this.state.CategoryName,
            Manufacturer: this.state.Manufacturer,
        });        
        // 3. copy the tempArray into products array
        this.setState({ Products: tempArray });
        */
    }   

    onClickUpdate(e){
        let product = {
            ProductId: this.state.ProductId,
            ProductName: this.state.ProductName,
            Price: this.state.Price,
            CategoryName: this.state.CategoryName,
            Manufacturer: this.state.Manufacturer,
        }

        this.serv
            .updateData(product, product.ProductId)
            .then(data=>data.json())
            .then(value=>{                                                                  
                console.log(JSON.stringify(value.data)); 
            })
            .catch(error=>{
                console.log(`Error occurred ${error.status}`);
            })
    }   

    getSelectedProduct(p) {       
        this.setState({ ProductId: p.ProductId });
        this.setState({ ProductName: p.ProductName });
        this.setState({ Price: p.Price });
        this.setState({ CategoryName: p.CategoryName });
        this.setState({ Manufacturer: p.Manufacturer });
    }

    deleteSelectedProduct(p) {   
        let ProductUniqueId = p._id;  
        this.serv
            .deleteData(ProductUniqueId)
            .then(data=>data.json())
            .then(value=>{                                                                 
                              
                this.serv
                        .getData()
                        .then(data=>data.json())
                        .then(value=>{
                            this.setState({ Products: value.data });  
                        })
                        .catch(error=>{
                            console.log(`Error occurred ${error.status}`);
                        })
            })
            .catch(error=>{
                console.log(`Error occurred ${error.status}`);
            })
    }

    sortByOption(e){            
        let type = e.target.value;
        let temp = this.state.Products;

        this.setState({ Products: temp.sort((a, b) => { 
            if( this.state.sortOption == 'ASC') {
              return  a[type] - b[type];
            } else if( this.state.sortOption == 'DESC') {
              return  b[type] - a[type];
            }                
          })
        });
    }

    sortOption(e) {      
        this.setState({ sortOption: e.target.value });
    }

    //method weill be excuted immediatly after the render() completes its job
    componentDidMount(){
        let products = this.serv
                        .getData()
                        .then(data=>data.json())
                        .then(value=>{
                            this.setState({ Products: value.data });                                                   
                            console.log(JSON.stringify(value));
                        })
                        .catch(error=>{
                            console.log(`Error occurred ${error.status}`);
                        })
    }

    render() {         
        return ( <div className="container">
            <div className="form-group">
                <label htmlFor="ProductId">ProductId</label>
                <input type="text" className="form-control" name="ProductId" value={this.state.ProductId} onChange={this.onChangeProduct.bind(this)}></input>
            </div>
            <div className="form-group">
                <label htmlFor="ProductName">ProductName</label>
                <input type="text" className="form-control" name="ProductName" value={this.state.ProductName} onChange={this.onChangeProduct.bind(this)}></input>
            </div>
            <div className="form-group">
                <label htmlFor="Price">Price</label>
                <input type="text" className="form-control" name="Price" value={this.state.Price} onChange={this.onChangeProduct.bind(this)}></input>
            </div>
            <div className="form-group">
                <label htmlFor="CategoryName">CategoryName</label>
                <select className="form-control" name="CategoryName" value={this.state.CategoryName} onChange={this.onChangeProduct.bind(this)}>
                    {this.state.Categories.map((c, i) => (
                        <Options key={i} data={c} />
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="Manufacturer">Manufacturer</label>
                <select className="form-control" name="Manufacturer" value={this.state.Manufacturer} onChange={this.onChangeProduct.bind(this)} >
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
                        <td>
                            <input type="button" value="Update" className="btn btn-success" onClick={this.onClickUpdate.bind(this)}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="container">
                <div className="form-group">
                    <label htmlFor="sortBy">Sort:  </label>
                    <select name="sortby" className="form-group" value={this.state.sortby} onClick={this.sortByOption.bind(this)}>
                        {
                            this.state.SortByArray.map(( sortValue, sortKey ) => 
                                ( <Options key={sortKey} data={sortValue} /> )
                            )
                        }
                    </select>
                </div>
            </div>
            <div className="container">
               <input type="radio" className="form-group" value="ASC" onClick={this.sortOption.bind(this)}/> Ascending
               <input type="radio" className="form-group" value="DESC" onClick={this.sortOption.bind(this)}/> Descending               
            </div>
            <div className="container">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            {
                                this.state.headers.map((h, i) => 
                                    ( <TableHeader key={i} header={h} /> )
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                       {this.state.Products.map((prd, idx) => (
                               <TableRow key={idx} row={prd}
                               selected={this.getSelectedProduct.bind(this)}
                               delete={this.deleteSelectedProduct.bind(this)}
                               />                               
                        ))}                        
                    </tbody>
                </table>
            </div>
        </div> );
    }
}

class TableHeader extends Component {   
    render() {
      return <th>{this.props.header}</th>;
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

    onDeleteClick(e){
        this.props.delete(this.props.row);   
    }

    render(){
        
        return(
            <tr onClick={this.onRowClick.bind(this)}>
                <td>{this.props.row.ProductId}</td>
                <td>{this.props.row.ProductName}</td>
                <td>{this.props.row.Price}</td>
                <td>{this.props.row.CategoryName}</td>
                <td>{this.props.row.Manufacturer}</td>  
                <td><input type="button" value="Delete" className="btn btn-warning" onClick={this.onDeleteClick.bind(this)} /></td>              
            </tr>
        )
    }
}
 
export default ProductComponent;
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface State {
  ekszerek: Ekszer[];
  regTipus: string;
  regAr: number;
  regAnyag: string;
  regSzin: string;
}

interface Ekszer {
  id: number;
  tipus: string;
  ar: number;
  anyag: string;
  szin: string;
}

interface EkszerListaResponse {
  adatok: Ekszer[];
}

class App extends Component<{}, State>{
  constructor(props: {}) {
    super(props);
    
    this.state = {
      ekszerek: [],
      regAnyag: '',
      regAr: 0,
      regSzin: '',
      regTipus: ''
    }
  }
  
  async ekszerekBetoltese(){
    let response = await fetch('http://localhost:3000/ekszer');
    let data = await response.json() as Ekszer[];
    this.setState({
      ekszerek: data,
    })
  }

  componentDidMount(){
    this.ekszerekBetoltese();
  }

  handleRegister = async () => {
    if(this.state.regAnyag === '' || this.state.regAr <=0 || this.state.regTipus === ''){
      alert('hiba!')
      return;
    }

    const adat = {
      anyag: this.state.regAnyag,
      szin: this.state.regSzin,
      ar: this.state.regAr,
      tipus: this.state.regTipus
    };

    let response = await fetch('http://localhost:3000/ekszer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(adat),
    });

    this.setState({
      regAnyag: '',
      regAr: 0,
      regSzin: '',
      regTipus: ''
    });

    await this.ekszerekBetoltese();
  }

  handleDelete = async (id:number) => {
    await fetch('http://localhost:3000/ekszer/'+id, {method:'DELETE'})
    this.ekszerekBetoltese();
  }

  render() {
    
    return <div className='container'>
      <div className='row'>
        <div className='col-lg-6'>
        <h2><i>Adatok</i></h2>
          <table>
          <div>{this.state.ekszerek.map(ekszer => <div><tr><td>Típus: {ekszer.tipus}</td></tr> <tr><td>Anyag: {ekszer.anyag}</td></tr> <tr><td>Szín: {ekszer.szin}</td></tr> <tr><td>Ár: {ekszer.ar}</td></tr> <button onClick={(event) => this.handleDelete(ekszer.id)} className='btn btn-danger'>Törlés</button> <hr /> </div>)}</div>
          </table>
        </div>
        <div className='col-lg-6'>
          <h2><i>Új ékszer regisztrálása</i></h2>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-3'>
                <span>Anyag: <input required value={this.state.regAnyag} onChange={e => this.setState({regAnyag: e.currentTarget.value})}/></span><br />
              </div>
              <div className='col-lg-3'>
                <span>Ár: <input type="number" required value={this.state.regAr} onChange={e => this.setState({regAr:parseInt (e.currentTarget.value)})}/></span><br />
              </div>
              <div className='col-lg-3'>
                <span>Szin: <input type="text" value={this.state.regSzin} onChange={e => this.setState({regSzin: e.currentTarget.value})}/></span><br />
              </div>
              <div className='col-lg-3'>
                <span>Tipus: <input type="text" required value={this.state.regTipus} onChange={e => this.setState({regTipus: e.currentTarget.value})}/></span><br />
              </div>
            </div>
            <br />
            <button onClick={this.handleRegister} className='btn btn-primary'>Regisztrál</button>
          </div>         
        </div>
      </div>     
    </div>
  }

}

export default App;

import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Header from 'components/Header/Header';
import isValidIBANNumber from 'util/validate';

import './home.scss';

const MySwal = withReactContent(Swal)

class Home extends React.Component {
    state = {
        iban: '',
    };

    handleClick = () => {
        if(isValidIBANNumber(this.state.iban)) {
            MySwal.fire({
                title: <div className="alert">IBAN is valid</div>,
                timer: 2000,
                type: 'success',
                showConfirmButton: false,
            });
        } else {
            MySwal.fire({
                title: <div className="alert">IBAN is invalid</div>,
                timer: 2000,
                type: 'error',
                showConfirmButton: false,
            });
        }
    };

    handleInput = (e) => {
        var selectedFile = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(selectedFile);
        reader.onload = function(event) {
            const ibanArray = event.target.result.split("\n");
            const validatedArray = ibanArray.map(iban => `${iban};${isValidIBANNumber(iban)}\r\n`).join('');
            
            var blob = new Blob([validatedArray], {type: 'text/plain'});
            var elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = `${selectedFile.name.split('.')[0]}.out`;        
            document.body.appendChild(elem);
            elem.click();        
            document.body.removeChild(elem);
        };
    };

    render() {
        const {
            iban,
        } = this.state;
        return (
            <React.Fragment>
            <Header />
            <div className="home">
                <div className="iban-code">
                    <TextField
                        onChange={(e) => this.setState({ iban: e.target.value })}
                        className="iban-text"
                        id="ibanCode"
                        label="IBAN"
                        margin="normal"
                    />
                </div>
                <div className="buttons">
                    <Button className="button" disabled={iban === '' && true} variant="contained" color="primary" size="large" onClick={this.handleClick}>
                        Submit
                    </Button>
                    
                    <input
                        accept="text/plain"
                        id="contained-button-file"
                        type="file"
                        onChange={(e) => this.handleInput(e)}
                        onClick={(event) => event.target.value = null}
                    />
                    <label htmlFor="contained-button-file">
                        <Button className="button" variant="contained" color="primary" size="large" component="span">
                            Upload File
                        </Button>
                    </label>
                </div>
            </div>
        </React.Fragment>
        )
    }
}

export default Home;

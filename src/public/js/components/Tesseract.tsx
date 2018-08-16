import * as React from 'react';
import { ChangeEvent, Component, FormEvent, ReactPropTypes } from 'react';

import * as tesseract from 'tesseract.js';
import { ImageLike, TesseractStatic } from "tesseract.js";


class Tesseract extends Component {

    // todo start adding state, as we're going to need it for manipulating the files and submitting

    tesseract: TesseractStatic;

    constructor(props: ReactPropTypes[]) {
        super(props);

    }

    ocr(imageFile: ImageLike) {
        console.log("checking image");
        tesseract.recognize(imageFile)
            .progress((message) => {
                    console.log(`Progress is ${message}`);
                }
            )
            .then((result) => {
                console.log("got a result!");
                console.log(result);
            });
    }

    private handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        console.log("image changed");
        let file = e.target.files[0];

        this.ocr(file);
    }

    private static handleSubmit(e: ChangeEvent | FormEvent) {
        console.log(e);
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => Tesseract.handleSubmit(e)}>
                    <input className="fileInput"
                           type="file"
                           onChange={(e) => this.handleImageChange(e)}/>
                    <button className="submitButton"
                            type="submit"
                            onClick={(e) => Tesseract.handleSubmit(e)}>Upload Image
                    </button>
                </form>
            </div>
        );
    }
}

export { Tesseract };
export default Tesseract;

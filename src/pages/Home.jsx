import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Button, Card, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { getAllBookApi, removeBookApi, saveBookApi } from '../services/allApi';






const Home = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [bookDetails, setbookDetails] = useState({
        Name: " ", Author: " ", imgLink: " "
    })
    const [allBooks, setAllBooks] = useState("")
    const [deleteResponse,setDeleteResponse] = useState("")
    useEffect(() => {
        getAllBooks()
    }, [deleteResponse])
    const deleteBook = async (id) => {
        try {
            let dresp = await removeBookApi(id)
            setDeleteResponse(dresp)
            if (dresp.status >= 200 && dresp.status < 300) {
                alert("video Deleted successfully")
            }

        }
        catch (err) {
            console.log(err);

        }


    }
    const updateBook = async (id) => {
        console.log("update");

    }

    const getAllBooks = async () => {
        try {


            const res = await getAllBookApi()
            if (res.status >= 200 && res.status < 300) {
                console.log("ok");
                setAllBooks(res.data)

            }



        }
        catch (err) {
            console.log(err);

        }
    }



    const handleUpload = async () => {

        console.log("allgood", bookDetails);

        try {
            let k = await saveBookApi(bookDetails)
            if (k.status >= 200 && k.status < 300) {
                alert("book details added ")
            }

            getAllBooks()

        } catch (err) {
            console.log(err);

        }


        handleClose()


    }

    return (
        <div className=''>
            <Header />
            <div className='container mt-5'>

                <div className=' d-flex align-items-center '>
                    <h3>Add New Book</h3>
                    <button className='btn btn-warning ms-2' onClick={handleShow}>+</button>
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Upload Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=' d-flex flex-column justfy-content-between border rounded p-5'>
                        <FloatingLabel controlId="floatingCaption" label="Book Name">
                            <Form.Control onChange={e => setbookDetails({ ...bookDetails, Name: e.target.value })} type="text" placeholder="Caption" />
                        </FloatingLabel>
                        <FloatingLabel className='my-3' controlId="floatingUrl" label="Author Name">
                            <Form.Control onChange={e => setbookDetails({ ...bookDetails, Author: e.target.value })} type="text" placeholder="url" />
                        </FloatingLabel>
                        <FloatingLabel className='my-3' controlId="floatingVideo" label="Image link">
                            <Form.Control onChange={e => setbookDetails({ ...bookDetails, imgLink: e.target.value })} type="text" placeholder="Video URL" />
                        </FloatingLabel>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        cancel
                    </Button>
                    <Button onClick={handleUpload} variant="primary">Submit</Button>


                </Modal.Footer>
            </Modal>
            <div className='container'>

                <Row className='my-5' onDrop={e => dropBack(e)} onDragOver={e => dragOver(e)}>
                    {

                        allBooks?.length > 0 ?
                            allBooks.map(book => (
                                <Col key={book?.id} sm={12} md={6} lg={4} className='my-2'>
                                    <Card className='d-felx flex-column' style={{ height: '350px' }}>
                                        <Card.Img variant="top" height={'200px'} width={'100%'} src={book?.imgLink} />
                                        <Card.Body>
                                            <Card.Text className='d-flex flex-column justify-content-between align-items-center'>
                                                <h4>{book?.Name}</h4>
                                                <p>{book?.Author}</p>
                                                <div className='d-flex w-100 flex-row justify-content-between align-items-center'>
                                                <button onClick={() => updateBook(book?.id)} className='btn btn-primary '>Update</button>
                                                <button onClick={() => deleteBook(book?.id)} className='btn '> <i class="fa-solid fa-trash text-danger"></i></button>
                                                </div>

                                            </Card.Text>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                            :
                            <div className='text-danger'> No books uploaded</div>


                    }
                </Row>
            </div>



        </div>
    )
}

export default Home
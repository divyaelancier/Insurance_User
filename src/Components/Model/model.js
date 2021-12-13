import React from "react";
import { Modal } from 'antd';
import "./model.scss";


function DynModel(props){
    const [visible, setVisible] = React.useState(false);

    function handleCancel() {
        setVisible(false)
        props.handleChangeCloseModel(false)
    }

    React.useEffect(()=>{
        setVisible(props.handleChangeModel)
    },[props.handleChangeModel])

    return(
        <Modal
        className={`modelContainer ${props.modalchanges}`}
        title={props.modelTitle}
        centered={props.centered ? true : false}
        visible={visible}
        footer={null}
        width={props.width ? props.width : 520}
        // zIndex={1201}
        onCancel={handleCancel}
        >
         {props.content}
        </Modal>
    )
}

export default DynModel;
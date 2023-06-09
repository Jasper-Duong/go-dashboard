/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Popconfirm } from "antd";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { TableFormContext } from "../../../contexts/TableFormContext";
import { message } from "antd";

export default function AddRowBtn({AddRowComponent}) {
  const {
    forceRender,
    services: { addItem },
  } = useContext(TableFormContext);
  const [isAdd, setIsAdd] = useState(false);
  const handleAdd = async ({ id, ...data }) => {
    try {
      await addItem(id, data);
      setIsAdd(false);
      forceRender();
      message.success("Added new Stock")
    } catch (err) {
      message.error("Failed")
    }
  };
  const AddConfirmBtn = () => (
    <div className="add-btn-confirm">
      <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
        Add
      </Button>
      <Popconfirm title="Sure to cancel?" onConfirm={() => setIsAdd(false)}>
        <a>Cancel</a>
      </Popconfirm>
    </div>
  );
  return (
    <Styled isAdd={isAdd}>
      {isAdd ? (
        <AddRowComponent
          onFinish={handleAdd}
          AddConfirmBtn={AddConfirmBtn}
        />
      ) : (
        <Button
          className="add-new-btn"
          type="primary"
          onClick={() => setIsAdd(true)}
        >
          Add new +
        </Button>
      )}
    </Styled>
  );
}

const Styled = styled.div`
  display: flex;
  justify-content: ${({ isAdd }) => (isAdd ? "space-between" : "flex-end")};
  .add-new-btn {
    margin-bottom: 1.25rem;
  }
  .add-btn-confirm {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

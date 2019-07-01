import React, { Component } from 'react';
import { Upload, Icon, Modal, message } from 'antd';

export default class PictureWall extends Component {
  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="clearfix">
        <Upload
          // 上传的服务器地址
          action="/manage/img/upload"
          listType="picture-card"
          // 展示图片文件
          fileList={fileList}
          // 点击预览的回调
          onPreview={this.handlePreview}
          // 点击删除/上传的回调
          onChange={this.handleChange}
          // 请求参数
          data={{
            id: this.props.id
          }}
          name="image"
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>

        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>)
  }
}
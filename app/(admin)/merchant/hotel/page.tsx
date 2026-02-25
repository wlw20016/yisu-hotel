'use client'

import React from 'react'
import {
  ProForm,
  ProFormText,
  ProFormDigit,
  ProFormRate,
  ProFormDatePicker,
  ProFormList,
  ProFormGroup,
  ProFormTextArea,
  ProFormSelect,
  PageContainer,
} from '@ant-design/pro-components'
import { message } from 'antd'

export default function HotelManagePage() {
  const [messageApi, contextHolder] = message.useMessage()

  // 处理表单提交
  const handleFinish = async (values: Record<string, unknown>) => {
    try {
      console.log('准备提交的酒店数据:', values)
      messageApi.loading({ content: '正在保存酒店信息...', key: 'save' })

      // TODO: 后续在这里对接 POST /api/hotel 接口，将数据存入 SQLite 数据库
      // 模拟网络请求延迟
      await new Promise((resolve) => setTimeout(resolve, 1500))

      messageApi.success({ content: '酒店信息录入成功！系统已提交审核。', key: 'save' })
      return true // 返回 true 会自动清空/重置表单（可根据需要修改）
    } catch (error) {
      messageApi.error({ content: '保存失败，请重试！', key: 'save' })
      return false
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {contextHolder}

      {/* PageContainer 提供标准的后台页面页头 */}
      <PageContainer
        title="酒店信息录入与管理"
        subTitle="商户可以在此发布或修改酒店的基础信息与房型价格"
      >
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <ProForm
            onFinish={handleFinish}
            submitter={{
              searchConfig: {
                submitText: '提交审核 / 保存信息',
                resetText: '重置表单',
              },
            }}
            initialValues={{
              star: 3,
              status: 'PENDING',
              rooms: [{ title: '标准双床房', price: 200, stock: 10 }], // 默认给一个房型占位
            }}
          >
            {/* 1. 基础必须维度 */}
            <ProForm.Group
              title="酒店基础信息 (必填)"
              tooltip="请准确填写酒店核心信息，以便用户搜索"
            >
              <ProFormText
                name="title"
                label="酒店名称 (中/英文)"
                placeholder="例如：上海陆家嘴禧玥酒店"
                rules={[{ required: true, message: '请输入酒店名称' }]}
                width="md"
              />
              <ProFormText
                name="address"
                label="酒店详细地址"
                placeholder="请输入详细的街道门牌号"
                rules={[{ required: true, message: '请输入酒店地址' }]}
                width="md"
              />
              <ProFormDatePicker
                name="openingTime"
                label="酒店开业时间"
                rules={[{ required: true, message: '请选择开业时间' }]}
                width="sm"
              />
              <ProFormDigit
                name="price"
                label="酒店起步价 (元)"
                placeholder="页面展示的最低价格"
                rules={[{ required: true, message: '请输入起步价' }]}
                width="sm"
                fieldProps={{ min: 0 }}
              />
            </ProForm.Group>

            <ProForm.Group>
              <ProFormRate
                name="star"
                label="酒店星级"
                rules={[{ required: true, message: '请选择星级' }]}
              />
            </ProForm.Group>

            {/* 2. 房型维度 (支持动态增删) */}
            <h3 className="text-base font-medium mt-6 mb-4">房型与库存管理 (必填)</h3>
            <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100">
              <ProFormList
                name="rooms"
                creatorButtonProps={{
                  position: 'bottom',
                  creatorButtonText: '新增房型',
                }}
              >
                <ProFormGroup>
                  <ProFormText
                    name="title"
                    label="房型名称"
                    placeholder="如：豪华大床房"
                    rules={[{ required: true }]}
                    width="sm"
                  />
                  <ProFormDigit
                    name="price"
                    label="单晚价格 (元)"
                    placeholder="如：500"
                    rules={[{ required: true }]}
                    width="sm"
                    fieldProps={{ min: 0 }}
                  />
                  <ProFormDigit
                    name="stock"
                    label="每日可用库存 (间)"
                    placeholder="如：10"
                    rules={[{ required: true }]}
                    width="sm"
                    fieldProps={{ min: 0 }}
                  />
                </ProFormGroup>
              </ProFormList>
            </div>

            {/* 3. 可选附加维度 */}
            <ProForm.Group
              title="附加营销信息 (选填)"
              tooltip="丰富的周边与优惠信息能提高用户的预订率"
            >
              <ProFormSelect
                name="tags"
                label="酒店标签 / 优惠活动"
                mode="tags"
                placeholder="输入标签后回车，如：春节8折、亲子首选"
                width="md"
                options={[
                  { label: '免费停车场', value: '免费停车场' },
                  { label: '靠近地铁', value: '靠近地铁' },
                  { label: '含双早', value: '含双早' },
                  { label: '连住优惠', value: '连住优惠' },
                ]}
              />
              <ProFormTextArea
                name="description"
                label="周边热门景点、交通及商场介绍"
                placeholder="例如：距离外滩2公里，步行5分钟可达地铁站..."
                width="xl"
                fieldProps={{
                  rows: 4,
                }}
              />
            </ProForm.Group>
          </ProForm>
        </div>
      </PageContainer>
    </div>
  )
}

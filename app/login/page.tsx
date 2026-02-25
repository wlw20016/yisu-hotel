'use client'

import React, { useState } from 'react'
import { LoginForm, ProFormText, ProFormRadio } from '@ant-design/pro-components'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { message, Tabs } from 'antd'
import { useRouter } from 'next/navigation'

type LoginType = 'login' | 'register'

export default function AdminLoginPage() {
  const [loginType, setLoginType] = useState<LoginType>('login')
  const router = useRouter()

  // 模拟提交处理函数
  const handleSubmit = async (values: {
    username: string
    password: string
    confirmPassword?: string
    role?: 'merchant' | 'admin'
  }) => {
    try {
      if (loginType === 'login') {
        // TODO: 对接真实登录接口
        // 需求说明：登录无需选择角色，系统自动根据账号判断
        console.log('登录提交参数:', values)
        message.success('登录成功！')

        // 模拟角色判断跳转
        // const role = await api.login(values);
        // if (role === 'admin') router.push('/admin/dashboard');
        // else router.push('/merchant/dashboard');
      } else {
        // TODO: 对接真实注册接口
        // 需求说明：注册需选择角色（商户/管理员）
        console.log('注册提交参数:', values)
        if (values.password !== values.confirmPassword) {
          message.error('两次输入的密码不一致！')
          return
        }
        message.success('注册成功，请登录！')
        setLoginType('login') // 注册成功后切换回登录
      }
    } catch (error) {
      message.error(`${loginType === 'login' ? '登录' : '注册'}失败，请重试！`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">易宿酒店管理平台</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm
            logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            title="易宿 (Yisu Hotel)"
            subTitle="致力于提供高效、便捷的酒店预订与管理服务"
            submitter={{
              searchConfig: {
                submitText: loginType === 'login' ? '登录' : '注册',
              },
            }}
            onFinish={handleSubmit}
          >
            <Tabs
              activeKey={loginType}
              onChange={(key) => setLoginType(key as LoginType)}
              centered
              items={[
                { key: 'login', label: '账户登录' },
                { key: 'register', label: '新用户注册' },
              ]}
            />

            {/* 公用的用户名和密码字段 */}
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder="请输入用户名/账号"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />

            {/* 仅在注册时显示的额外字段 */}
            {loginType === 'register' && (
              <>
                <ProFormText.Password
                  name="confirmPassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  placeholder="请确认密码"
                  rules={[
                    {
                      required: true,
                      message: '请再次输入密码！',
                    },
                  ]}
                />
                <ProFormRadio.Group
                  name="role"
                  label="选择您的角色"
                  initialValue="merchant"
                  options={[
                    {
                      label: '酒店商户',
                      value: 'merchant',
                    },
                    {
                      label: '系统管理员',
                      value: 'admin',
                    },
                  ]}
                  rules={[
                    {
                      required: true,
                      message: '请选择您的角色！',
                    },
                  ]}
                />
              </>
            )}
          </LoginForm>
        </div>
      </div>
    </div>
  )
}

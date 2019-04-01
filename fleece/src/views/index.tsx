import * as React from "react";

// 定义一个接口约束传递进来的参数类型(类似传统js中[组件.propTypes = {})
export interface HelloProps { compiler: string; framework: string; }

// 定义一个类去继承React.Component
export class Hello extends React.Component<HelloProps, undefined> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
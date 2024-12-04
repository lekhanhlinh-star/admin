import * as React from 'react';
import { Layout } from 'react-admin';
import Appbar from './Appbar';

export default ({ children }: { children: React.ReactNode }) => (
    <Layout appBar={Appbar} >
        {children}
    </Layout>
);
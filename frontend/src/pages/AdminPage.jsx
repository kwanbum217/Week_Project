import React, { useEffect, useState } from 'react';
import { Box, Heading, Spinner, Alert, Table } from '@chakra-ui/react';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { 'Content-Type': 'application/json' };
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch('/api/admin/users', { headers });

                if (response.status === 403 || response.status === 401) {
                    throw new Error('관리자 권한이 필요합니다.');
                }
                if (!response.ok) {
                    throw new Error('데이터를 불러오는데 실패했습니다.');
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <Box p={10} display="flex" justifyContent="center"><Spinner size="xl" /></Box>;
    if (error) return (
        <Box p={10} mt={20}>
            <Alert.Root status="error" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" py={10}>
                <Alert.Indicator boxSize="40px" />
                <Heading size="md" mt={4} mb={1}>접근 제한</Heading>
                <Alert.Description>{error}</Alert.Description>
            </Alert.Root>
        </Box>
    );

    return (
        <Box p={10} maxW="1200px" mx="auto" mt={32}>
            <Heading mb={8} color="teal.600">관리자 대시보드</Heading>
            <Box overflowX="auto" shadow="lg" borderRadius="lg" bg="white">
                <Table.Root variant="simple">
                    <Table.Header bg="gray.100">
                        <Table.Row>
                            <Table.ColumnHeader>ID</Table.ColumnHeader>
                            <Table.ColumnHeader>이메일 / 계정</Table.ColumnHeader>
                            <Table.ColumnHeader>이름</Table.ColumnHeader>
                            <Table.ColumnHeader>가입 경로</Table.ColumnHeader>
                            <Table.ColumnHeader>권한</Table.ColumnHeader>
                            <Table.ColumnHeader>지역</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {users.map(user => (
                            <Table.Row key={user.id} _hover={{ bg: "gray.50" }}>
                                <Table.Cell>{user.id}</Table.Cell>
                                <Table.Cell fontWeight="bold">{user.email}</Table.Cell>
                                <Table.Cell>{user.username}</Table.Cell>
                                <Table.Cell>{user.provider}</Table.Cell>
                                <Table.Cell>
                                    <Box as="span" px={2} py={1} borderRadius="md" bg={user.role === 'ADMIN' ? 'red.100' : 'green.100'} color={user.role === 'ADMIN' ? 'red.700' : 'green.700'} fontSize="sm" fontWeight="bold">
                                        {user.role}
                                    </Box>
                                </Table.Cell>
                                <Table.Cell>{user.location || '-'}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Box>
        </Box>
    );
};

export default AdminPage;


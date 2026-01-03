import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

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
            <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
                <AlertIcon boxSize="40px" mr={0} />
                <Heading size="md" mt={4} mb={1}>접근 제한</Heading>
                {error}
            </Alert>
        </Box>
    );

    return (
        <Box p={10} maxW="1200px" mx="auto" mt={32}>
            <Heading mb={8} color="teal.600">관리자 대시보드</Heading>
            <Box overflowX="auto" shadow="lg" borderRadius="lg" bg="white">
                <Table variant="simple">
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>ID</Th>
                            <Th>이메일 / 계정</Th>
                            <Th>이름</Th>
                            <Th>가입 경로</Th>
                            <Th>권한</Th>
                            <Th>지역</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map(user => (
                            <Tr key={user.id} _hover={{ bg: "gray.50" }}>
                                <Td>{user.id}</Td>
                                <Td fontWeight="bold">{user.email}</Td>
                                <Td>{user.username}</Td>
                                <Td>{user.provider}</Td>
                                <Td>
                                    <Box as="span" px={2} py={1} borderRadius="md" bg={user.role === 'ADMIN' ? 'red.100' : 'green.100'} color={user.role === 'ADMIN' ? 'red.700' : 'green.700'} fontSize="sm" fontWeight="bold">
                                        {user.role}
                                    </Box>
                                </Td>
                                <Td>{user.location || '-'}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default AdminPage;

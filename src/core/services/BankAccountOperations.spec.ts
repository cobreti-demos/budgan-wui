import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import '@/core/setupInversify'
import { BankAccountOperations } from './BankAccountOperations';
import type { BankAccount } from '../models/BankAccountTypes';

describe('BankAccountOperations', () => {

    let bankAccountOperationService = new BankAccountOperations();

    beforeEach( async() => {
        bankAccountOperationService = new BankAccountOperations();
    });

    afterEach( async() => {
        vi.resetAllMocks();
    })
    
    
    test('getTransactionsInBothAccounts success', () => {

        const account1 : BankAccount = {
            accountId: '1',
            name: 'Account 1',
            accountType: 'Checking',
            transactions: [{
                name: 'Group 1',
                id: '1',
                dateStart: new Date(),
                dateEnd: new Date(),
                transactions:[
                    {
                        transactionId: '1',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    },
                    {
                        transactionId: '2',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    },
                    {
                        transactionId: '3',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    }
                ]
            }]
        } as BankAccount;

        const account2 : BankAccount = {
            accountId: '1',
            name: 'Account 2',
            accountType: 'Checking',
            transactions: [{
                name: 'Group 1',
                id: '1',
                dateStart: new Date(),
                dateEnd: new Date(),
                transactions:[
                    {
                        transactionId: '1',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    },
                    {
                        transactionId: '3',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    },
                    {
                        transactionId: '4',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    }
                ]
            }]
        } as BankAccount;

        const result = bankAccountOperationService.getTransactionsInBothAccounts(account1, account2);
    
        expect(result).toEqual(new Set(['1', '3']));
    });

    test('getTransactionsInBothAccounts in multiple transactions groups success', () => {

        const account1 : BankAccount = {
            accountId: '1',
            name: 'Account 1',
            accountType: 'Checking',
            transactions: [
                {
                    name: 'Group 1',
                    id: '1',
                    dateStart: new Date(),
                    dateEnd: new Date(),
                    transactions:[
                        {
                            transactionId: '1',
                            date: new Date(),
                            amount: 100,
                            type: 'Deposit',
                            description: 'Deposit'
                        },
                        {
                            transactionId: '2',
                            date: new Date(),
                            amount: 100,
                            type: 'Deposit',
                            description: 'Deposit'
                        },
                        {
                            transactionId: '3',
                            date: new Date(),
                            amount: 100,
                            type: 'Deposit',
                            description: 'Deposit'
                        }
                    ]
                },
                {
                    name: 'Group 2',
                    id: '2',
                    dateStart: new Date(),
                    dateEnd: new Date(),
                    transactions:[
                        {
                            transactionId: '4',
                            date: new Date(),
                            amount: 100,
                            type: 'Deposit',
                            description: 'Deposit'
                        },
                        {
                            transactionId: '5',
                            date: new Date(),
                            amount: 100,
                            type: 'Deposit',
                            description: 'Deposit'
                        },
                        {
                            transactionId: '6',
                            date: new Date(),
                            amount: 100,
                            type: 'Deposit',
                            description: 'Deposit'
                        }
                    ]
                }
            ]
        } as BankAccount;

        const account2 : BankAccount = {
            accountId: '1',
            name: 'Account 2',
            accountType: 'Checking',
            transactions: [
                {
                    name: 'Group 1',
                    id: '1',
                    dateStart: new Date(),
                    dateEnd: new Date(),
                    transactions:[
                        {
                            transactionId: '1',
                            date: new Date(),
                            amount: 100,
                            type: 'Deposit',
                            description: 'Deposit'
                        },
                        {
                            transactionId: '8',
                            date: new Date(),
                            amount: 100,
                            type: 'Deposit',
                            description: 'Deposit'
                        },
                        {
                            transactionId: '4',
                            date: new Date(),
                            amount: 100,
                            type: 'Deposit',
                            description: 'Deposit'
                        }
                    ]
                },
                {
                    name: 'Group 2',
                    id: '2',
                    dateStart: new Date(),
                    dateEnd: new Date(),
                    transactions:[
                        {
                            transactionId: '7',
                            date: new Date(),
                            amount: 100,
                            type: 'Deposit',
                            description: 'Deposit'
                        },
                        {
                            transactionId: '3',
                            date: new Date(),
                            amount: 100,
                            type: 'Deposit',
                            description: 'Deposit'
                        },
                        {
                            transactionId: '9',
                            date: new Date(),
                            amount: 100,
                            type: 'Deposit',
                            description: 'Deposit'
                        }
                    ]
                
                }
            ]
        } as BankAccount;

        const result = bankAccountOperationService.getTransactionsInBothAccounts(account1, account2);
    
        expect(result).toEqual(new Set(['1', '3', '4']));
    });

    test('account id does not match', () => {
            
        const account1 : BankAccount = {
            accountId: '1',
            name: 'Account 1',
            accountType: 'Checking',
            transactions: [{
                name: 'Group 1',
                id: '1',
                dateStart: new Date(),
                dateEnd: new Date(),
                transactions:[
                    {
                        transactionId: '1',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    },
                    {
                        transactionId: '2',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    },
                    {
                        transactionId: '3',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    }
                ]
            }]
        } as BankAccount;

        const account2 : BankAccount = {
            accountId: '2',
            name: 'Account 2',
            accountType: 'Checking',
            transactions: [{
                name: 'Group 1',
                id: '1',
                dateStart: new Date(),
                dateEnd: new Date(),
                transactions:[
                    {
                        transactionId: '1',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    },
                    {
                        transactionId: '3',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    },
                    {
                        transactionId: '4',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    }
                ]
            }]
        } as BankAccount;

        expect(() => bankAccountOperationService.getTransactionsInBothAccounts(account1, account2)).toThrowError('Account Ids do not match');
    });

    test('removeTransactionsFromBankAccount success', () => {
            
        const account : BankAccount = {
            accountId: '1',
            name: 'Account 1',
            accountType: 'Checking',
            transactions: [{
                name: 'Group 1',
                id: '1',
                dateStart: new Date(),
                dateEnd: new Date(),
                transactions:[
                    {
                        transactionId: '1',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    },
                    {
                        transactionId: '2',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    },
                    {
                        transactionId: '3',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    }
                ]
            }]
        } as BankAccount;

        const transactionsToRemove = new Set(['1', '3']);

        bankAccountOperationService.removeTransactionsFromBankAccount(account, transactionsToRemove);
    
        expect(account).toEqual({
            accountId: '1',
            name: 'Account 1',
            accountType: 'Checking',
            transactions: [{
                name: 'Group 1',
                id: '1',
                dateStart: new Date(),
                dateEnd: new Date(),
                transactions:[
                    {
                        transactionId: '2',
                        date: new Date(),
                        amount: 100,
                        type: 'Deposit',
                        description: 'Deposit'
                    }
                ]
            }]
        });
    });

    test('removeTransactionsFromBankAccount success with multiple groups', () => {
            
            const startDate = new Date();
            const endDate = new Date(startDate.getDate() + 1);
            const account : BankAccount = {
                accountId: '1',
                name: 'Account 1',
                accountType: 'Checking',
                transactions: [
                    {
                        name: 'Group 1',
                        id: '1',
                        dateStart: startDate,
                        dateEnd: endDate,
                        transactions:[
                            {
                                transactionId: '1',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            },
                            {
                                transactionId: '2',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            },
                            {
                                transactionId: '3',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            }
                        ]
                    },
                    {
                        name: 'Group 2',
                        id: '2',
                        dateStart: startDate,
                        dateEnd: endDate,
                        transactions:[
                            {
                                transactionId: '4',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            },
                            {
                                transactionId: '5',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            },
                            {
                                transactionId: '6',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            }
                        ]
                    }
                ]
            } as BankAccount;
    
            const transactionsToRemove = new Set(['1', '3', '5']);

            const expectedResult = {
                accountId: '1',
                name: 'Account 1',
                accountType: 'Checking',
                transactions: [
                    {
                        name: 'Group 1',
                        id: '1',
                        dateStart: startDate,
                        dateEnd: endDate,
                        transactions:[
                            {
                                transactionId: '2',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            }
                        ]
                    },
                    {
                        name: 'Group 2',
                        id: '2',
                        dateStart: startDate,
                        dateEnd: endDate,
                        transactions:[
                            {
                                transactionId: '4',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            },
                            {
                                transactionId: '6',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            }
                        ]
                    }
                ]
            };
    
            bankAccountOperationService.removeTransactionsFromBankAccount(account, transactionsToRemove);
        
            expect(account).toEqual(expectedResult);
    });

    test('removeTransactionsFromBankAccount success with multiple groups and empty groups in the result', () => {
                
            const startDate = new Date();
            const endDate = new Date(startDate.getDate() + 1);
            const account : BankAccount = {
                accountId: '1',
                name: 'Account 1',
                accountType: 'Checking',
                transactions: [
                    {
                        name: 'Group 1',
                        id: '1',
                        dateStart: startDate,
                        dateEnd: endDate,
                        transactions:[
                            {
                                transactionId: '1',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            },
                            {
                                transactionId: '2',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            },
                            {
                                transactionId: '3',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            }
                        ]
                    },
                    {
                        name: 'Group 2',
                        id: '2',
                        dateStart: startDate,
                        dateEnd: endDate,
                        transactions:[
                            {
                                transactionId: '4',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            },
                            {
                                transactionId: '5',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            },
                            {
                                transactionId: '6',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            }
                        ]
                    }
                ]
            } as BankAccount;
    
            const transactionsToRemove = new Set(['1', '2', '3', '5', '6']);
    
            const expectedResult = {
                accountId: '1',
                name: 'Account 1',
                accountType: 'Checking',
                transactions: [
                    {
                        name: 'Group 2',
                        id: '2',
                        dateStart: startDate,
                        dateEnd: endDate,
                        transactions:[
                            {
                                transactionId: '4',
                                date: new Date(),
                                amount: 100,
                                type: 'Deposit',
                                description: 'Deposit'
                            }
                        ]
                    }
                ]
            };
    
            bankAccountOperationService.removeTransactionsFromBankAccount(account, transactionsToRemove);
        
            expect(account).toEqual(expectedResult);
    });
});

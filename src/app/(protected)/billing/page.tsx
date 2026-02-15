'use client'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { creditsToDollars } from '@/constants'
import { createCheckoutSession } from '@/lib/stripe'
import { api } from '@/trpc/react'
import { Info } from 'lucide-react'
import React from 'react'
import TransactionHistory from './transaction-history'



const BillingPage = () => {
    const { data: credits } = api.project.getMyCredits.useQuery()
    const [creditsToBuy, setCreditsToBuy] = React.useState<number[]>([100])
    const creditsToBuyAmount = creditsToBuy[0]!
    const price = (creditsToBuyAmount / creditsToDollars).toFixed(2)
    return (
        <div className='space-y-5 text-zinc-100'>
            <section className="glass-card space-y-3 p-6 md:p-8">
                <h1 className='text-4xl font-semibold tracking-tight md:text-5xl'>Billing</h1>
                <p className='text-base text-zinc-400'>You have <strong className='text-zinc-100'>{credits}</strong> credits remaining.</p>
                <div className="rounded-md border border-zinc-800 bg-black/60 px-4 py-3 text-zinc-300">
                    <div className="flex items-center gap-2">
                        <Info className='size-4 text-zinc-100' />
                        <p className='text-sm'>Each credit allows you to index 1 file in a repository.</p>
                    </div>
                    <p className='text-sm'>E.g. If your project has 100 files, you will need 100 credits to index it.</p>
                </div>
                <div className="pt-2">
                    <Slider defaultValue={[100]} max={1000} min={25} step={5} onValueChange={(value) => setCreditsToBuy(value)} value={creditsToBuy} />
                </div>
                <Button onClick={() => createCheckoutSession(creditsToBuyAmount)} className="border border-zinc-200 bg-white text-black hover:bg-zinc-200">Buy {creditsToBuyAmount} Credits for ${price}</Button>
            </section>
            <TransactionHistory />
        </div>
    )
}

export default BillingPage

'use client'
import { Header } from '@/app/(dashboard)/[role]/dashboard/_components/Header'
import { Main } from '@/app/(dashboard)/[role]/dashboard/_components/Main'
import { TopNav } from '@/app/(dashboard)/[role]/dashboard/_components/TopNav'
import { Overview } from '@/app/(dashboard)/_components/Overview'
import { ProfileDropdown } from '@/app/profile/_components/ProfileDropdown'
import { Search } from '@/components/common/Search'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  DollarSign,
  Filter,
  LayoutGrid,
  List,
  MapPin,
  MoreHorizontal,
  Phone,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'



export default function Dashboard() {
  return (
    <>
     
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <Button>Download</Button>
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList className='!flex-row'>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='sale-profile'>Sale Profile</TabsTrigger>
              <TabsTrigger value='customer'>Customer</TabsTrigger>
            </TabsList>
            <TabsContent value='overview' className='space-y-4 mt-5'>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Revenue
                    </CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>$45,231.89</div>
                    <p className='text-xs text-muted-foreground'>
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Subscriptions
                    </CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                      <circle cx='9' cy='7' r='4' />
                      <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+2350</div>
                    <p className='text-xs text-muted-foreground'>
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <rect width='20' height='14' x='2' y='5' rx='2' />
                      <path d='M2 10h20' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+12,234</div>
                    <p className='text-xs text-muted-foreground'>
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Active Now
                    </CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+573</div>
                    <p className='text-xs text-muted-foreground'>
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
                <Card className='col-span-1 lg:col-span-4'>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className='ps-2'>
                    <Overview />
                  </CardContent>
                </Card>
                <Card className='col-span-1 lg:col-span-3'>
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* <RecentSales /> */}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            {/* ====== ANALYTICS TAB ====== */}
            <TabsContent value='analytics' className='space-y-4 mt-5'>
              {/* Row 1: Sales Report + Store Overview */}
              <div className='grid gap-4 lg:grid-cols-7'>
                <Card className='col-span-1 lg:col-span-5'>
                  <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle>Sales Report</CardTitle>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-muted-foreground'>Monthly</span>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Chart placeholder */}
                    <div className='flex h-[220px] items-end gap-1'>
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => {
                        const heights = [30, 40, 55, 60, 65, 68, 72, 78, 85, 90, 88, 92]
                        return (
                          <div key={m} className='flex flex-1 flex-col items-center gap-1'>
                            <div className='w-full rounded-t bg-blue-500/20' style={{ height: `${heights[i]}%` }}>
                              <div className='h-full w-full rounded-t bg-blue-500' style={{ opacity: 0.3 + i * 0.06 }} />
                            </div>
                            <span className='text-[10px] text-muted-foreground'>{m}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className='col-span-1 lg:col-span-2'>
                  <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle>Store Overview</CardTitle>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </CardHeader>
                  <CardContent className='space-y-5'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-500'>
                        <ShoppingCart className='h-5 w-5' />
                      </div>
                      <div>
                        <p className='text-lg font-bold'>$89,585</p>
                        <p className='text-xs text-muted-foreground'>Store Sales</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-500'>
                        <Users className='h-5 w-5' />
                      </div>
                      <div>
                        <p className='text-lg font-bold'>$42,455</p>
                        <p className='text-xs text-muted-foreground'>Visits</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600'>
                        <DollarSign className='h-5 w-5' />
                      </div>
                      <div>
                        <p className='text-lg font-bold'>$38,625</p>
                        <p className='text-xs text-muted-foreground'>Avg Earnings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Row 2: Weekly Stats + Sales History + Best Selling */}
              <div className='grid gap-4 lg:grid-cols-3'>
                {/* Weekly Stats */}
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle className='text-base'>Weekly Stats</CardTitle>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className='flex h-[100px] items-end gap-2'>
                      {[65, 80, 55, 90, 70, 85, 60].map((h, i) => (
                        <div key={i} className='flex-1 rounded-t bg-blue-500' style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <Separator className='my-4' />
                    <div className='space-y-3'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <TrendingUp className='h-4 w-4 text-blue-500' />
                          <div>
                            <p className='text-sm font-medium'>Total Sales</p>
                            <p className='text-xs text-muted-foreground'>2,458 Today</p>
                          </div>
                        </div>
                        <span className='font-bold'>$5,258</span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <TrendingUp className='h-4 w-4 text-green-500' />
                          <div>
                            <p className='text-sm font-medium'>Total Revenue</p>
                            <p className='text-xs text-muted-foreground'>Revenue target</p>
                          </div>
                        </div>
                        <span className='font-bold'>$4,958</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sales History */}
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle className='text-base'>Sales History</CardTitle>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    {[
                      { name: 'Timothy Boyd', date: '14 DEC, 2023', amount: '$750.00', color: 'bg-blue-400' },
                      { name: 'Adrian Monino', date: '23 DEC, 2023', amount: '$820.00', color: 'bg-blue-500' },
                      { name: 'Socrates Itumay', date: '24 DEC, 2023', amount: '$180.00', color: 'bg-blue-600' },
                      { name: 'Althea Cabardo', date: '01 DEC, 2023', amount: '$190.00', color: 'bg-blue-700' },
                    ].map((sale, i) => (
                      <div key={i} className='flex items-center gap-3'>
                        <div className={`h-2.5 w-2.5 rounded-full ${sale.color}`} />
                        <div className='flex-1'>
                          <p className='text-sm font-medium'>{sale.name}</p>
                          <p className='text-xs text-muted-foreground'>{sale.date}</p>
                        </div>
                        <span className='text-sm font-semibold'>{sale.amount}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Best Selling */}
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle className='text-base'>Best Selling</CardTitle>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    {[
                      { name: 'Edifier headphone', sku: 'RWL-H-001', reviews: 380, stars: 5 },
                      { name: 'Apple watch ultra', sku: 'RWL-H-002', reviews: 750, stars: 5 },
                      { name: 'Google pixel buds', sku: 'RWL-H-003', reviews: 420, stars: 4 },
                      { name: 'iPhone 15 pro max', sku: 'RWL-H-004', reviews: 543, stars: 5 },
                      { name: 'Canon camera kit', sku: 'RWL-H-005', reviews: 467, stars: 5 },
                    ].map((item, i) => (
                      <div key={i} className='flex items-center gap-3'>
                        <div className='h-9 w-9 rounded-full bg-muted' />
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium truncate'>{item.name}</p>
                          <p className='text-xs text-muted-foreground'>{item.sku}</p>
                        </div>
                        <div className='text-right shrink-0'>
                          <div className='flex gap-0.5'>
                            {Array.from({ length: 5 }).map((_, s) => (
                              <Star key={s} className={`h-3 w-3 ${s < item.stars ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                            ))}
                          </div>
                          <p className='text-xs text-muted-foreground'>{item.reviews} Reviews</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ====== SALE PROFILE TAB ====== */}
            <TabsContent value='sale-profile' className='mt-5'>
              <div className='grid gap-6 lg:grid-cols-[280px_1fr]'>
                {/* Sidebar – Seller profile */}
                <Card className='h-fit'>
                  <CardContent className='pt-6 text-center'>
                    {/* Avatar */}
                    <div className='relative mx-auto h-24 w-24'>
                      <div className='h-24 w-24 overflow-hidden rounded-full bg-muted'>
                        <img
                          src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
                          alt='Seller avatar'
                          className='h-full w-full object-cover'
                        />
                      </div>
                      <span className='absolute right-1 bottom-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white'>✓</span>
                    </div>
                    <h3 className='mt-3 text-lg font-semibold'>Alice Johnson</h3>
                    <p className='text-sm text-muted-foreground'>5.2k followers</p>

                    <div className='mt-4 flex gap-2'>
                      <Button className='flex-1 rounded-full' size='sm'>Follow</Button>
                      <Button variant='outline' className='flex-1 rounded-full' size='sm'>Message</Button>
                    </div>

                    <Separator className='my-5' />

                    <div className='space-y-2 text-left text-sm text-muted-foreground'>
                      <div className='flex items-center gap-2'><Calendar className='h-4 w-4' /> Joined 2022-03-15</div>
                      <div className='flex items-center gap-2'><Phone className='h-4 w-4' /> +1 (555) 123-4567</div>
                      <div className='flex items-center gap-2'><MapPin className='h-4 w-4' /> San Francisco, USA</div>
                    </div>

                    <Separator className='my-5' />

                    <div className='text-left'>
                      <h4 className='font-semibold'>About</h4>
                      <p className='mt-1 text-sm text-muted-foreground'>Experienced IT professional with a passion for cybersecurity and network optimization.</p>
                    </div>

                    <Separator className='my-5' />

                    <div className='text-left'>
                      <h4 className='font-semibold'>Seller Stats</h4>
                      <div className='mt-2 flex gap-6'>
                        <div className='flex items-center gap-2'>
                          <CreditCard className='h-4 w-4 text-muted-foreground' />
                          <div>
                            <p className='text-xs text-muted-foreground'>Items Sold</p>
                            <p className='font-bold'>150</p>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                          <div>
                            <p className='text-xs text-muted-foreground'>Avg Rating</p>
                            <p className='font-bold'>4.8/5</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className='my-5' />

                    <div className='text-left'>
                      <h4 className='font-semibold'>Favorite Tags</h4>
                      <div className='mt-2 flex flex-wrap gap-2'>
                        {['cybersecurity', 'networking', 'cloud', 'devops', 'ai'].map(tag => (
                          <Badge key={tag} variant='secondary' className='rounded-md text-xs font-normal'>{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Main content – Products */}
                <div className='space-y-8'>
                  {/* Featured Products */}
                  <div>
                    <h2 className='text-xl font-bold'>Featured Products</h2>
                    <div className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                      {[
                        { name: 'Wireless Earbuds Pro', cat: 'Wearables', price: 56.78, old: 102.80, rating: 4.5, tag: 'New' },
                        { name: 'SmartFit Watch X1', cat: 'Lifestyle', price: 70.37, rating: 4.2 },
                        { name: 'ErgoBoost Laptop Stand', cat: 'Tech', price: 119.32, rating: 4.3 },
                        { name: 'ShieldPro Phone Case', cat: 'Audio', price: 40.21, rating: 4.5 },
                      ].map((p, i) => (
                        <Card key={i} className='group overflow-hidden'>
                          <div className='relative h-32 bg-gradient-to-br from-neutral-100 to-neutral-200'>
                            {p.tag && <Badge className='absolute top-2 left-2 bg-red-500 text-white text-[10px]'>{p.tag}</Badge>}
                            <Badge variant='secondary' className='absolute bottom-2 left-2 text-[10px]'>{p.cat}</Badge>
                          </div>
                          <CardContent className='pt-3'>
                            <p className='text-sm font-medium truncate'>{p.name}</p>
                            <div className='mt-1 flex items-center justify-between'>
                              <div className='flex items-center gap-1'>
                                {p.old && <span className='text-xs text-muted-foreground line-through'>${p.old}</span>}
                                <span className='font-bold'>${p.price}</span>
                              </div>
                              <span className='flex items-center gap-0.5 rounded bg-neutral-900 px-1.5 py-0.5 text-[10px] font-semibold text-white'>
                                <Star className='h-2.5 w-2.5 fill-white' /> {p.rating}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* More Products */}
                  <div>
                    <div className='flex items-center justify-between'>
                      <h2 className='text-xl font-bold'>More Products</h2>
                      <button className='flex items-center gap-1 text-sm text-red-500 hover:underline'>
                        ✂ Special Offers
                      </button>
                    </div>
                    <div className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                      {[
                        { name: 'PowerBank 20000mAh', cat: 'Lifestyle', price: 91.19, rating: 4.9 },
                        { name: 'SoundWave Bluetooth Speaker', cat: 'Audio', price: 94.98, rating: 4.9 },
                        { name: 'FitTrack Pro', cat: 'Tech', price: 97.12, rating: 4.9 },
                      ].map((p, i) => (
                        <Card key={i} className='group overflow-hidden'>
                          <div className='relative h-40 bg-gradient-to-br from-neutral-200 to-neutral-300'>
                            <Badge variant='secondary' className='absolute bottom-2 left-2 text-[10px]'>{p.cat}</Badge>
                          </div>
                          <CardContent className='pt-3'>
                            <p className='text-sm font-medium truncate'>{p.name}</p>
                            <div className='mt-1 flex items-center justify-between'>
                              <span className='font-bold'>${p.price}</span>
                              <span className='flex items-center gap-0.5 rounded bg-neutral-900 px-1.5 py-0.5 text-[10px] font-semibold text-white'>
                                <Star className='h-2.5 w-2.5 fill-white' /> {p.rating}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ====== CUSTOMER TAB ====== */}
            <TabsContent value='customer' className='space-y-6 mt-5'>
              {/* Greeting */}
              <h2 className='text-2xl font-bold'>Hello, Devon Lane 👋</h2>

              {/* Stat cards */}
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                {[
                  { label: 'Total Balance', value: '$98,955.00', change: '+0.48%', up: true, icon: Wallet },
                  { label: 'Total Income', value: '$24,414.00', change: '+0.32%', up: true, icon: DollarSign },
                  { label: 'Total Outcome', value: '$16,245.00', change: '+0.24%', up: true, icon: CreditCard },
                  { label: 'New Customers', value: '$2867', change: '+0.12%', up: false, icon: Users },
                ].map((stat, i) => (
                  <Card key={i}>
                    <CardContent className='pt-5'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                          <stat.icon className='h-4 w-4' />
                          {stat.label}
                        </div>
                        <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                          {stat.change}
                          {stat.up ? <ArrowUpRight className='h-3 w-3' /> : <ArrowDownRight className='h-3 w-3' />}
                        </span>
                      </div>
                      <p className='mt-2 text-2xl font-bold'>{stat.value}</p>
                      <p className='text-xs text-muted-foreground'>Data per 12 Jan 2024</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Toolbar */}
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <div className='relative w-64'>
                  <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input placeholder='Search' className='h-9 pl-9 text-sm' />
                </div>
                <div className='flex items-center gap-2'>
                  <Button variant='outline' size='sm' className='gap-1.5 text-xs'>
                    <Filter className='h-3.5 w-3.5' /> Filters
                  </Button>
                  <Button variant='outline' size='sm' className='text-xs'>Weekly</Button>
                  <div className='flex overflow-hidden rounded-md border'>
                    <Button variant='ghost' size='icon' className='h-8 w-8 rounded-none'>
                      <List className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon' className='h-8 w-8 rounded-none border-l'>
                      <LayoutGrid className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Customer table */}
              <Card>
                <CardContent className='p-0'>
                  <div className='overflow-x-auto'>
                    <table className='w-full text-sm'>
                      <thead>
                        <tr className='border-b text-left text-muted-foreground'>
                          <th className='px-4 py-3 font-medium'>Name</th>
                          <th className='px-4 py-3 font-medium'>Email</th>
                          <th className='px-4 py-3 font-medium'>Phone</th>
                          <th className='px-4 py-3 font-medium'>Platform</th>
                          <th className='px-4 py-3 font-medium'>Join Date</th>
                          <th className='px-4 py-3 font-medium'>Status</th>
                          <th className='px-4 py-3' />
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { status: 'Inactive', color: 'bg-orange-500' },
                          { status: 'Active', color: 'bg-green-500' },
                          { status: 'Active', color: 'bg-yellow-500' },
                          { status: 'Inactive', color: 'bg-red-500' },
                          { status: 'Active', color: 'bg-purple-500' },
                          { status: 'Active', color: 'bg-teal-500' },
                          { status: 'Inactive', color: 'bg-pink-500' },
                          { status: 'Active', color: 'bg-cyan-500' },
                        ].map((row, i) => (
                          <tr key={i} className='border-b last:border-0 hover:bg-muted/40'>
                            <td className='px-4 py-3'>
                              <div className='flex items-center gap-3'>
                                <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${row.color}`}>JA</span>
                                <span className='font-medium'>Jackson Alexander</span>
                              </div>
                            </td>
                            <td className='px-4 py-3 text-muted-foreground'>jacksonalexander@gmail.com</td>
                            <td className='px-4 py-3 text-muted-foreground'>+11 387-6327</td>
                            <td className='px-4 py-3 text-muted-foreground'>Outreach</td>
                            <td className='px-4 py-3 text-muted-foreground'>24/01/2024</td>
                            <td className='px-4 py-3'>
                              <Badge
                                variant={row.status === 'Active' ? 'default' : 'secondary'}
                                className={row.status === 'Active'
                                  ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                  : 'bg-red-100 text-red-600 hover:bg-red-100'}
                              >
                                {row.status}
                              </Badge>
                            </td>
                            <td className='px-4 py-3'>
                              <Button variant='ghost' size='icon' className='h-8 w-8'>
                                <MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Pagination */}
              <div className='flex items-center justify-between text-sm text-muted-foreground'>
                <span>Showing 8 items per page</span>
                <div className='flex items-center gap-1'>
                  <Button variant='ghost' size='icon' className='h-8 w-8'>
                    <ChevronLeft className='h-4 w-4' />
                  </Button>
                  {[1, 2, 3, 4].map(p => (
                    <Button
                      key={p}
                      variant={p === 1 ? 'default' : 'ghost'}
                      size='icon'
                      className={`h-8 w-8 text-xs ${p === 1 ? 'bg-neutral-900 text-white' : ''}`}
                    >
                      {p}
                    </Button>
                  ))}
                  <span>...</span>
                  <Button variant='ghost' size='icon' className='h-8 w-8 text-xs'>12</Button>
                  <Button variant='ghost' size='icon' className='h-8 w-8'>
                    <ChevronRight className='h-4 w-4' />
                  </Button>
                  <span className='ml-2'>Go to</span>
                  <Input className='ml-1 h-8 w-14 text-xs' />
                  <span>Page</span>
                </div>
              </div>
            </TabsContent>
          </div>

        </Tabs>
      </Main>
    </>
  )
}


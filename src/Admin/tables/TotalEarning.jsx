// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'

import { useSelector } from 'react-redux'

const TotalEarning = () => {
  const { adminsOrder } = useSelector(store => store);

  const totalRevenue = adminsOrder.orders?.reduce((acc, order) => acc + order.totalDiscountedPrice, 0) || 0;

  const calculateCategoryEarning = (categoryName) => {
    return adminsOrder.orders?.reduce((acc, order) => {
      const categoryTotal = order.orderItems?.reduce((itemAcc, item) => {
        // Simple top-level category check
        let isMatch = false;
        let currentCategory = item.product?.category;
        while (currentCategory) {
          if (currentCategory.name.toLowerCase() === categoryName.toLowerCase()) {
            isMatch = true;
            break;
          }
          currentCategory = currentCategory.parentCategory;
        }
        return isMatch ? itemAcc + item.discountedPrice : itemAcc;
      }, 0);
      return acc + categoryTotal;
    }, 0) || 0;
  };

  const categories = [
    {
      title: 'Men',
      amount: calculateCategoryEarning('men'),
      subtitle: 'Clothing, Footware',
      imgSrc: 'https://rukminim1.flixcart.com/image/612/612/xif0q/shirt/z/3/7/xl-r-dark-grey-stoneberg-original-imaghghn2vcf5euv.jpeg?q=70'
    },
    {
      title: 'Women',
      amount: calculateCategoryEarning('women'),
      subtitle: 'Clothing, Handbags, jewellery',
      imgSrc: 'https://rukminim1.flixcart.com/image/612/612/xif0q/lehenga-choli/y/p/c/free-half-sleeve-jk-6-kedar-fab-original-imaghh4unhxgyveg.jpeg?q=70'
    },
    {
      title: 'Kids',
      amount: calculateCategoryEarning('kids'),
      subtitle: 'Clothing',
      imgSrc: 'https://rukminim1.flixcart.com/image/612/612/xif0q/kids-t-shirt/i/7/e/10-11-years-bwtrnfulboy-bz55-blive-original-imagmuafh2ennezv.jpeg?q=70'
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Total Earning'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(1.5)} !important` }}>
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
            ₹{totalRevenue}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main', ml: 1 }}>
            <MenuUp sx={{ fontSize: '1.875rem', verticalAlign: 'middle' }} />
            <Typography variant='body2' sx={{ fontWeight: 600, color: 'success.main' }}>
              10%
            </Typography>
          </Box>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 5 }}>
          Real-time earning sync
        </Typography>

        {categories.map((item, index) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== categories.length - 1 ? { mb: 4 } : {})
              }}
            >
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 40,
                  height: 40,
                }}
              >
                <img src={item.imgSrc} alt={item.title} height={30} />
              </Avatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant='caption'>{item.subtitle}</Typography>
                </Box>

                <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                    ₹{item.amount}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TotalEarning

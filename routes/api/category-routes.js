const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const data = await Category.findAll({
    include:[
      Product
    ]
  })
  res.status(200).json(data)
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const data = await Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      Product
    ]
  })

  res.status(200).json(data)

  //! be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    //* create a new category
    const newData = await Category.create({
      category_name: req.body.category_name
    })
    const {id, category_name} = newData.dataValues
    res.status(200).send(`New Category was add under id: ${id} name: ${category_name}`)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category_name = req.body.category_name
    const id = req.params.id    
    const updateData = await Category.update(
      {
        category_name: category_name
      },
      {
        where: {
          id: id
        }
      }
      )
      res.status(200).json(`Updated Category: ${category_name} was add under: ${id}`)
    }catch(err){
    res.status(400).json(err.errors[0].message)
  } 

});

router.delete('/:id', async (req, res) => {
  try {
    
    const deleteData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
      res.status(200).json(`Category was deleted under: ${req.params.id}`)
    }catch(err){
    res.status(400).json(err.errors[0].message)
  } 
  // delete a category by its `id` value
});

module.exports = router;

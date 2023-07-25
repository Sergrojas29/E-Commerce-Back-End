const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const data = await Category.findAll()
  res.status(200).json(data)
  // find all categories
  //! be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const data = await Category.findOne({
    where: {
      category_id: req.params.id
    }
  })

  res.status(200).json(data)

  //! be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    //* create a new category
    const { category_id, category_name } = req.body
    const newData = await Category.create({
      category_id: req.body.category_id,
      category_name: req.body.category_name
    })
    console.log(newData);
    res.status(200).send(`New Category: ${category_id} was add under: ${category_name}`)
  } catch (err) {
    res.status(400).json(err.errors[0].message)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category_name = req.body.category_name
    const category_id = req.params.id
    
    const updateData = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          category_id: req.params.id
        }
      }
      )
      res.status(200).json(`Updated Category: ${category_name} was add under: ${category_id}`)
    }catch(err){
    res.status(400).json(err.errors[0].message)
  } 

});

router.delete('/:id', async (req, res) => {
  try {
    const category_id = req.params.id
    
    const deleteData = await Category.destroy(
      {
        where: {
          category_id: category_id
        }
      }
      )
      res.status(200).json(`Category was deleted under: ${category_id}`)
    }catch(err){
    res.status(400).json(err.errors[0].message)
  } 
  // delete a category by its `id` value
});

module.exports = router;

const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const data = await Tag.findAll()
    res.status(200).json(data)
  } catch (err) {
    res.status(400).json(err)    
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Tag.findOne(
      {
        where: {
          tag_id: req.params.id
        }
      }
    )
    res.status(200).json(data)
  } catch (err) {
    res.status(400).json(err)    
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const {tag_name} = req.body
    const newTag = await Tag.create(
      {
        tag_name: tag_name
      }
    )
    res.status(200).send(`New Tag: ${tag_name}`)
  } catch (err) {
    res.status(400).json(err) 
  }
});

router.put('/:id', (req, res) => {
  const id = req.params.id
  const tag_name = req.body.tag_name
  const updateTag = Tag.update(
    {
      tag_name:tag_name
    },
    {
      where: {
        tag_id: id
      }
    }
  )
  res.status(200).json(`Updated tag: ${tag_name} was add under: ${id}`)
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    
    const deleteData = await Tag.destroy(
      {
        where: {
          tag_id: id
        }
      }
      )
      res.status(200).json(`Category was deleted under: ${id}`)
    }catch(err){
    res.status(400).json(err.errors[0].message)
  } 
  // delete on tag by its `id` value
});

module.exports = router;

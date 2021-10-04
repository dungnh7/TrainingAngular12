using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using sd2376_workshop_backend.Core.IRepositories;
using sd2376_workshop_backend.Core.IUnitOfWork;
using sd2376_workshop_backend.Extentions;
using sd2376_workshop_backend.Models;
using sd2376_workshop_backend.ViewModels;
using sd2376_workshop_backend.ViewModels.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace sd2376_workshop_backend.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowOrigin")]
    [ApiController]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IGenericRepository<Models.Task> repository;
        public DisplayOptions Options { get; }

        public TasksController(IUnitOfWork unitOfWork, IOptions<DisplayOptions> optionsAccessor)
        {
            this.unitOfWork = unitOfWork;
            repository = unitOfWork.Repository<Models.Task>();
            Options = optionsAccessor.Value;
        }

        // GET: api/<TasksController>
        [HttpGet]
        public async Task<IActionResult> GetTasksAsync(int pageIndex, int status)
        {
            var request = Request.Headers.TryGetValue("Authorization", out StringValues token);
            var tasksQuery = await unitOfWork.Tasks.GetTasksAsync(pageIndex, Options.PageSize, status);
            var tasks = tasksQuery.Select(x => new TaskViewModel()
            {
                Id=x.Id,
                Name= x.Name,
                Description=x.Description,
                StatusId= x.Status?.Name,
                UserId = x.User?.Name
            });

            int CountTask = unitOfWork.Tasks.GetTasksCount(status);

            Pagination<TaskViewModel> pages = new Pagination<TaskViewModel>()
            {                
                Items = tasks,
                PageIndex = pageIndex,
                PageSize = Options.PageSize,
                TotalRows = CountTask
            };
            
            return Ok(pages);
        }

        // GET api/<TasksController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var task = await unitOfWork.Tasks.GetTaskDetailAsync(id);
            var taskDetail = new TaskViewModel()
            {
                Id = task?.Id == null ? 0 : task.Id ,
                Name = task?.Name,
                Description = task?.Description,                
                UserId = task?.User?.Name,
                StatusId= task?.Status?.Name
            };
            return Ok(taskDetail);
        }

        // POST api/<TasksController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TaskForm model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Models.Task task = new Models.Task
                    {
                        Name = model.Name.Trim(),
                        Description = model.Description,
                        StatusId = model.StatusId,
                        UserId = model.UserId
                    };
                    var response = await repository.InsertAsync(task);
                    await unitOfWork.SaveChanges();

                    return StatusCode(201, response);
                }
                return new JsonResult("Somethign Went wrong") { StatusCode = 500 };
            }
            catch (Exception ex)
            {
                return new JsonResult("Somethign Went wrong: " + ex.Message) { StatusCode = 500 };
            }
        }

        // PUT api/<TasksController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] TaskForm model, int id)
        {
            if (id != model.Id)
                return BadRequest();
            else
            {
                try
                {
                    Models.Task task = new Models.Task
                    {
                        Id=id,
                        Name = model.Name.Trim(),
                        Description = model.Description,
                        StatusId = model.StatusId,
                        UserId = model.UserId
                    };
                    var response = repository.Update(task, id);
                    await unitOfWork.SaveChanges();
                    return StatusCode(200, response);

                }
                catch (Exception ex)
                {
                    return new JsonResult("Somethign Went wrong: " + ex.Message) { StatusCode = 500 };
                }
            }

        }

        // DELETE api/<TasksController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await repository.Delete(id);
            await unitOfWork.SaveChanges();
            if (response)
            {
                return StatusCode(200, id);
            }
            return new JsonResult("Somethign Went wrong") { StatusCode = 500 };
        }
    }
}

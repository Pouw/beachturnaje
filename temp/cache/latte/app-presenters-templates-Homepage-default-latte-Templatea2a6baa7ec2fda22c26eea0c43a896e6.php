<?php
// source: /srv/www/beachturnaje/app/presenters/templates/Homepage/default.latte

class Templatea2a6baa7ec2fda22c26eea0c43a896e6 extends Latte\Template {
function render() {
foreach ($this->params as $__k => $__v) $$__k = $__v; unset($__k, $__v);
// prolog Latte\Macros\CoreMacros
list($_b, $_g, $_l) = $template->initialize('19092e529d', 'html')
;
// prolog Latte\Macros\BlockMacros
//
// block content
//
if (!function_exists($_b->blocks['content'][] = '_lb18dccfb1d5_content')) { function _lb18dccfb1d5_content($_b, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?><div>
<?php call_user_func(reset($_b->blocks['title']), $_b, get_defined_vars())  ?>
</div>

<div id="content">
    <table cellspacing='0'>
	    <tr><th>Datum</th><th>Popis</th><th>Kapacita</th></tr>
        <tbody>
<?php $iterations = 0; foreach ($events as $event) { ?>            <tr>
                <td><?php echo Latte\Runtime\Filters::escapeHtml($template->date($event->start_time, 'j. n. Y G:i'), ENT_NOQUOTES) ?></td>
                <td><?php echo Latte\Runtime\Filters::escapeHtml($event->name, ENT_NOQUOTES) ?></td>
                <td><?php echo Latte\Runtime\Filters::escapeHtml($event->teams, ENT_NOQUOTES) ?>
/<?php echo Latte\Runtime\Filters::escapeHtml($event->capacity, ENT_NOQUOTES) ?></td>
            </tr>
<?php $iterations++; } ?>
       </tbody>
    </table>
</div>


<?php $iterations = 0; foreach ($events as $event) { ?><div class="post">
    <div class="date"><?php echo Latte\Runtime\Filters::escapeHtml($template->date($event->start_time, 'F j, Y'), ENT_NOQUOTES) ?></div>

    <h2><?php echo Latte\Runtime\Filters::escapeHtml($event->name, ENT_NOQUOTES) ?></h2>

    <div><?php echo Latte\Runtime\Filters::escapeHtml($event->content, ENT_NOQUOTES) ?></div>
</div>
<?php $iterations++; } ?>

<?php
}}

//
// block title
//
if (!function_exists($_b->blocks['title'][] = '_lb60d34f6f11_title')) { function _lb60d34f6f11_title($_b, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?>	<h1>Beach volejbalové turnaje</h1>
<?php
}}

//
// block scripts
//
if (!function_exists($_b->blocks['scripts'][] = '_lb3cbb3fad31_scripts')) { function _lb3cbb3fad31_scripts($_b, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
;Latte\Macros\BlockMacrosRuntime::callBlockParent($_b, 'scripts', get_defined_vars()) ?>
<script src="http://jush.sourceforge.net/jush.js"></script>
<script>

</script>
<?php
}}

//
// block head
//
if (!function_exists($_b->blocks['head'][] = '_lbe797b6c8c9_head')) { function _lbe797b6c8c9_head($_b, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?><style>

</style>
<?php
}}

//
// end of blocks
//

// template extending

$_l->extends = empty($_g->extended) && isset($_control) && $_control instanceof Nette\Application\UI\Presenter ? $_control->findLayoutTemplateFile() : NULL; $_g->extended = TRUE;

if ($_l->extends) { ob_start();}

// prolog Nette\Bridges\ApplicationLatte\UIMacros

// snippets support
if (empty($_l->extends) && !empty($_control->snippetMode)) {
	return Nette\Bridges\ApplicationLatte\UIMacros::renderSnippets($_control, $_b, get_defined_vars());
}

//
// main template
//
if ($_l->extends) { ob_end_clean(); return $template->renderChildTemplate($_l->extends, get_defined_vars()); }
call_user_func(reset($_b->blocks['content']), $_b, get_defined_vars())  ?>

<?php call_user_func(reset($_b->blocks['scripts']), $_b, get_defined_vars())  ?>


<?php call_user_func(reset($_b->blocks['head']), $_b, get_defined_vars()) ; 
}}